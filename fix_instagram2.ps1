$threadsPath = 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.829.871 4.83-1.548 7.158C17.506 23.088 15.363 23.98 12.186 24z'
$instaPath = 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.75-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'

# Instagram block marker and Threads block marker
$instaBlockOld = "<!-- Instagram -->
        <a href=""https://www.instagram.com/vindru.drilling/"" target=""_blank"" rel=""noopener"" aria-label=""Instagram"">
          <svg width=""18"" height=""18"" fill=""currentColor"" viewBox=""0 0 24 24""><path d=""$threadsPath""/></svg>
        </a>"
$instaBlockNew = "<!-- Instagram -->
        <a href=""https://www.instagram.com/vindru.drilling/"" target=""_blank"" rel=""noopener"" aria-label=""Instagram"">
          <svg width=""18"" height=""18"" fill=""currentColor"" viewBox=""0 0 24 24""><path d=""$instaPath""/></svg>
        </a>"

foreach ($f in @('h:\vindru-demo768\about.html','h:\vindru-demo768\contact.html','h:\vindru-demo768\services.html','h:\vindru-demo768\products-new.html')) {
    $c = [System.IO.File]::ReadAllText($f)
    if ($c.Contains($instaBlockOld)) {
        $c2 = $c.Replace($instaBlockOld, $instaBlockNew)
        [System.IO.File]::WriteAllText($f, $c2)
        "Fixed Instagram in: $f" | Out-File h:\vindru-demo768\fix_log3.txt -Append
    } else {
        "No match in: $f" | Out-File h:\vindru-demo768\fix_log3.txt -Append
    }
}
