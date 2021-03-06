#!/usr/bin/env bash

#
# Automatic script to bump version of repository
#
# - bump node modules to new version
# - update git tag
# - regenerate changelog
# - push all changes to repository
#

set -e

checkit='\xE2\x9C\x85'
failed='\xE2\x9D\x8C'

# list of the nodejs app modules
NPM_MODULES=( server static wss )
REQUIRED='git-generate-changelog'
ROOT=$(git rev-parse --show-toplevel)

echo
echo -e "______ _           ___  ___               _           _ "
echo -e "|  ___(_)          |  \/  |              | |         | |"
echo -e "| |_   _ _ __ ___  | .  . | __ _ _ __ ___| |__   __ _| |"
echo -e "|  _| | | '__/ _ \ | |\/| |/ _\` | '__/ __| '_ \ / _\` | |"
echo -e "| |   | | | |  __/ | |  | | (_| | |  \__ \ | | | (_| | |"
echo -e "\_|   |_|_|  \___| \_|  |_/\__,_|_|  |___/_| |_|\__,_|_|"
echo -e "                                                        "
echo

# generated by http://patorjk.com/software/taag/#p=testall&f=Fun%20Face&t=Fire%20Marshal

echo "bump app version"

echo -e "$checkit  check if $REQUIRED installed"
command -v git-generate-changelog >/dev/null 2>&1 || { echo -e >&2 "$failed  \033[1m$REQUIRED\033[0m is required https://github.com/github-changelog-generator/github-changelog-generator#installation."; exit 1; }

if [[ -z "${CHANGELOG_GITHUB_TOKEN}" ]]; then
  echo -e "$failed  \033[1mCHANGELOG_GITHUB_TOKEN\033[0m is required env variable"
  exit 1
fi

echo -e "$checkit  pull master"
git checkout master
git pull

echo -e "$checkit  bump new version of repository"

for i in "${NPM_MODULES[@]}"
do
    printf "$checkit  bump ${i} version to: "
	(cd ${ROOT}/${i}; npm version ${1:-patch})
done

PACKAGE_VERSION=$(cd ${ROOT}/${NPM_MODULES[0]}; cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo -e "$checkit  new version is $PACKAGE_VERSION"

echo -e "$checkit  commit new version"
git commit -am ":rocket: bump to $PACKAGE_VERSION"

echo -e "$checkit  update tag"
git tag ${PACKAGE_VERSION}

echo -e "$checkit  push commit"
git push

echo -e "$checkit  push tag"
git push --tags

echo -e "$checkit  regenerate changelog"
(cd ${ROOT}; git-generate-changelog --issue-line-labels alexa assistant dialog experiment optimization)

echo -e "$checkit  commit changelog"
git add ${ROOT}/CHANGELOG.md
git commit -am ":scroll: changelog $PACKAGE_VERSION"

echo -e "$checkit  push change log"
git push

echo -e "$checkit  well done!"
