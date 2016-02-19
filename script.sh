#!/usr/bin/env bash


variable='variable_list'
text='text';
while read line
do
  value=$(eval echo $line)
  text=$(sed "s/$line/$value/g" <<< "build=\"$text\"")
done < "$variable"
echo "$text" > variable_list