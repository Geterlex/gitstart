Set-Location $PSScriptRoot
Start-Process 'http://localhost:8000/'
if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server 8000
} else {
  python -m http.server 8000
}
