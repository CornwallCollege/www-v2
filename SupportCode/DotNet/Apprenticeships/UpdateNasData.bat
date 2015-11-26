git pull origin octopus

C:\Windows\Microsoft.NET\Framework64\v4.0.30319/msbuild ./NasDataPull/NasDataPull.sln /p:Configuration=Release

NasDataPull\NasDataPull\bin\Release\NasDataPull.exe ../../../_data

git commit -a -m "updated NAS data"

git push origin octopus