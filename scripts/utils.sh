# COMMON COMMANDS
#
# echo -n     does not append \n, usefull to have multiple echos appending to the same line
#      -e     enable backslashes. Ex: \n will output a new line

RED='\033[0;31m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
RESET='\033[0m'

purple() { echo -e "${PURPLE}$1${RESET}" ; }
red() { echo -e "${RED}$1${RESET}" ; }
green() { echo -e "${GREEN}$1${RESET}" ; }

# adds a new line if last line if not empty
ensureNewline() {
    if [ "$(tail -c1 "$1"; echo x)" != $'\nx' ]; then
        echo "" >>"$1"
    fi
}

asHHMMSS() {
    echo "$(( ${1} / 3600 ))h $(( (${1} / 60) % 60 ))m $(( ${1} % 60 ))s"
}

# transforms seconds to format MMSS
# Ex: $(asMMSS 600) =>
asMMSS() {
    echo "$(( ${1} / 60 ))m $(( ${1} % 60 ))s"
}

header () {
    echo -e "${PURPLE}"
    echo "****************************************************************************************************************"
    echo -e $1
    echo "****************************************************************************************************************"
    echo -e "${RESET}"
}

header2 () {
    echo ""
    purple "$1"
}

