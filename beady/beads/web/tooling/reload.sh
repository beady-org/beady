#!/bin/bash
community=$(cd -- "$(dirname "$0")" &> /dev/null && cd ../../.. && pwd)

"$community/beads/web/tooling/disable.sh"
"$community/beads/web/tooling/enable.sh"
