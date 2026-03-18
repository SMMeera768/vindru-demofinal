$instaPath = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
$threadspath = 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.829.871 4.83-1.548 7.158C17.506 23.088 15.363 23.98 12.186 24z'

$instaBlock = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="' + $instaPath + '"/></svg>'
$threadsBlock = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="' + $threadspath + '"/></svg>'

foreach ($f in @('h:\vindru-demo768\index.html','h:\vindru-demo768\about.html','h:\vindru-demo768\contact.html','h:\vindru-demo768\services.html','h:\vindru-demo768\products-new.html')) {
    $c = [System.IO.File]::ReadAllText($f)

    # Find Instagram block and Threads block positions
    $instaPos = $c.IndexOf('aria-label="Instagram"')
    $threadsPos = $c.IndexOf('aria-label="Threads"')

    if ($instaPos -eq -1 -or $threadsPos -eq -1) {
        "SKIP (not found): $f" | Out-File h:\vindru-demo768\fix_final.txt -Append
        continue
    }

    # Get the SVG in the Instagram block
    $instasvgStart = $c.IndexOf('<svg', $instaPos)
    $instasvgEnd = $c.IndexOf('</svg>', $instaPos) + 6
    $currentInstaSvg = $c.Substring($instasvgStart, $instasvgEnd - $instasvgStart)

    # Get the SVG in the Threads block
    $threadssvgStart = $c.IndexOf('<svg', $threadsPos)
    $threadssvgEnd = $c.IndexOf('</svg>', $threadsPos) + 6
    $currentThreadsSvg = $c.Substring($threadssvgStart, $threadssvgEnd - $threadssvgStart)

    "File: $f" | Out-File h:\vindru-demo768\fix_final.txt -Append
    "  Instagram SVG starts with: $($currentInstaSvg.Substring(0, [Math]::Min(60, $currentInstaSvg.Length)))" | Out-File h:\vindru-demo768\fix_final.txt -Append
    "  Threads SVG starts with: $($currentThreadsSvg.Substring(0, [Math]::Min(60, $currentThreadsSvg.Length)))" | Out-File h:\vindru-demo768\fix_final.txt -Append

    # Fix Instagram if it has wrong SVG
    if (-not $currentInstaSvg.Contains($instaPath)) {
        $c = $c.Remove($instasvgStart, $instasvgEnd - $instasvgStart).Insert($instasvgStart, $instaBlock)
        "  Fixed Instagram" | Out-File h:\vindru-demo768\fix_final.txt -Append
    }

    # Recalculate Threads position after possible change
    $threadsPos = $c.IndexOf('aria-label="Threads"')
    $threadssvgStart = $c.IndexOf('<svg', $threadsPos)
    $threadssvgEnd = $c.IndexOf('</svg>', $threadsPos) + 6
    $currentThreadsSvg = $c.Substring($threadssvgStart, $threadssvgEnd - $threadssvgStart)

    # Fix Threads if it has wrong SVG
    if (-not $currentThreadsSvg.Contains($threadspath)) {
        $c = $c.Remove($threadssvgStart, $threadssvgEnd - $threadssvgStart).Insert($threadssvgStart, $threadsBlock)
        "  Fixed Threads" | Out-File h:\vindru-demo768\fix_final.txt -Append
    }

    [System.IO.File]::WriteAllText($f, $c)
}
