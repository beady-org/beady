#!/usr/bin/env bash

sudo service led-status stop

cd /home/pi/beady
localbranch=$(git symbolic-ref -q --short HEAD)
localremote=$(git config branch.$localbranch.remote)

if [[ "$(git remote get-url "$localremote")" != *beady/beady* ]]; then
    git remote set-url "${localremote}" "https://github.com/beady/beady.git"
fi

echo "beads/point_of_sale/tools/posbox/overwrite_after_init/home/pi/beady" >> .git/info/sparse-checkout

git fetch "${localremote}" "${localbranch}" --depth=1
git reset "${localremote}"/"${localbranch}" --hard

sudo git clean -dfx
if [ -d /home/pi/beady/beads/point_of_sale/tools/posbox/overwrite_after_init ]; then
    cp -a /home/pi/beady/beads/point_of_sale/tools/posbox/overwrite_after_init/home/pi/beady/* /home/pi/beady/
    rm -r /home/pi/beady/beads/point_of_sale/tools/posbox/overwrite_after_init
fi

# TODO: Remove this code when v16 is deprecated
beady_conf="beads/point_of_sale/tools/posbox/configuration/beady.conf"
if ! grep -q "server_wide_modules" $beady_conf; then
    echo "server_wide_modules=hw_drivers,hw_escpos,hw_posbox_homepage,point_of_sale,web" >> $beady_conf
fi

sudo service led-status start
