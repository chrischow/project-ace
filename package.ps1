$inDir = "./rokr-dev/src/components"
$inDir2 = "./rokr-dev/src/utils"

$dest = "./rokr-dev/build/txt" # For testing first. To change to actual folder once it's good to go.

if (-not (Test-Path -Path $dest)) {
    md $dest
}

function Pack-JS([string]$files) {
    Get-ChildItem $files | ForEach-Object {
        # Get-Content returns String[]!!! not String. So you need to join up the lines.

        $newData = (Get-Content $_.FullName) -replace '^import (?<data>.*)', '/**RAVEN* import ${data} */' `
            -replace '^export (default )?', '/**RAVEN* export $1*/'
        "//**RAVEN**filename={" + $_.BaseName + $_.Extension + "}/`n" + ($newData -join "`n") | Out-File -Encoding utf8 ("${dest}/" + $_.BaseName + ".txt")
    }
}

Pack-JS "${inDir}/*.js"
Pack-JS "${inDir2}/*.js"