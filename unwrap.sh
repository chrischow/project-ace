# For testing first. To change to actual folder once it's good to go.
inDir="./rokr-dev/build/txt" 
dest="./rokr-dev/build/js"

pattern='s/\/\*\*RAVEN\* \(.*\)\*\//\1/'
[ ! -d $dest ] && mkdir $dest

for file in "$inDir"/*.txt
do
    baseFile=${file%.*}
    baseFile=${baseFile##*/}
    # echo $"//**RAVEN**filename={${baseFile}.js}" > "${dest}/${baseFile}.txt"
    sed "$pattern" "${file}" > "${dest}/${baseFile}.js"
    tail -n +2 "${dest}/${baseFile}.js" > "${dest}/${baseFile}.temp" && mv "${dest}/${baseFile}.temp" "${dest}/${baseFile}.js"
done