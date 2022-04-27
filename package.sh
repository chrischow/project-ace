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

cd "$dest"
cat fakeData.txt processData.txt queryData.txt Brand.txt Intro.txt Navbar.txt ProgressCard.txt HomeCards.txt ProgressBar.txt Home.txt Icons.txt Modal.txt ObjectiveForm.txt ObjectiveForm2.txt KRForm.txt KRForm2.txt KRModal.txt UpdatesForm.txt OKRCollapse.txt Tabs.txt TeamOKRs.txt Team.txt Timeline.txt Directory.txt > AllComponents.txt