#!/bin/bash -ex
# Copyright (c) 2016, CodiLime Inc.
#
# Build and publish authorization docker
# $SEAHORSE_BUILD_TAG required for deployment
#
# Example usage from jenkins:
# ./jenkins/authorization-publish.sh

SEAHORSE_BUILD_TAG="${SEAHORSE_BUILD_TAG?Need to set SEAHORSE_BUILD_TAG. For example export SEAHORSE_BUILD_TAG=SEAHORSE_BUILD_TAG=\`date +%Y%m%d_%H%M%S\`-\$GIT_TAG}"

# Set working directory to project root file
# `dirname $0` gives folder containing script
cd `dirname $0`"/../"

cd deployment/docker
./build-local-docker.sh ../authorization-docker/ deepsense-authorization
./publish-local-docker.sh deepsense-authorization $SEAHORSE_BUILD_TAG