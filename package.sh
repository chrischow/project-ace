inDir="./rokr-dev/src/components"
inDir2="./rokr-dev/src/utils"

dest="./rokr-dev/build/txt" # For testing first. To change to actual folder once it's good to go.

pattern='s/^import\(.*\)/\/**RAVEN* import\1*\//;s/^export \(default \)\?/\/**RAVEN* export \1*\//'
[ ! -d $dest ] && mkdir $dest

for file in "$inDir"/*.js
do
    baseFile=${file%.*}
    baseFile=${baseFile##*/}
    echo $"//**RAVEN**filename={${baseFile}.js}" > "${dest}/${baseFile}.txt"
    #sed "$pattern" "${file}" >> "${dest}/${baseFile}.txt"
    awk -f package.awk "${file}" >> "${dest}/${baseFile}.txt"
done

for file in "$inDir2"/*.js
do
    baseFile=${file%.*}
    baseFile=${baseFile##*/}
    echo $"//**RAVEN**filename={${baseFile}.js}" > "${dest}/${baseFile}.txt"
    #sed "$pattern" "${file}" >> "${dest}/${baseFile}.txt"
    awk -f package.awk "${file}" >> "${dest}/${baseFile}.txt"
done