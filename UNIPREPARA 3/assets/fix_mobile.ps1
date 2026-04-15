# Script to move mobile menu OUTSIDE header on all HTML pages
# The mobile menu INSIDE <header z-50> can't escape the stacking context, so z-[200] has no effect on page content

$files = @("index.html", "universidades.html", "preparatorio.html", "sobre.html", "login.html", "cadastro.html")

foreach ($file in $files) {
    if (-not (Test-Path $file)) { continue }
    $content = Get-Content $file -Raw

    # Move mobile menu div from inside </header> to just BEFORE </header>
    # Pattern: the mobile menu is from <div id="mobile-menu" ... to </div> just before </header>
    # We want it AFTER </header> instead
    
    # Extract the mobile-menu div and remove it from inside header
    $mobileMenuPattern = '(\s*<div id="mobile-menu"[\s\S]*?</div>\s*)\s*</header>'
    
    if ($content -match $mobileMenuPattern) {
        $mobileMenuBlock = $matches[1]
        # Remove from inside header
        $content = $content -replace [regex]::Escape($mobileMenuBlock), ""
        # Insert after </header>
        $content = $content -replace '</header>', "</header>`n$($mobileMenuBlock.Trim())"
    }

    Set-Content -Path $file -Value $content -NoNewline
    Write-Output "Processed: $file"
}
