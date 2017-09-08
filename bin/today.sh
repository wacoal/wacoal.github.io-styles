#!/bin/bash

#date '+%Y%m%d'

val='abcdefg'
val_henko=`echo ${val}|sed -e s/abc/xyz/g`
echo ${val_henko}
