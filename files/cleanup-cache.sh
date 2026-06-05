#!/usr/bin/env bash

MAX_CACHE_SIZE=$((5 * 1024 * 1024 * 1024)) # 5GB

SCRIPT_DIR=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
CACHE_DIR="${SCRIPT_DIR}/../.next/cache/images" 

get_directory_size() {
  du -sb "$1" | cut -f1
}

clean_cache() {
  if [ -n "$1" ]
  then
    find "$1" -type f -delete
  fi
}

cache_size=$(get_directory_size "$CACHE_DIR")

if [ "$cache_size" -gt "$MAX_CACHE_SIZE" ]; then
  echo "Cache size ($cache_size bytes) exceeds limit ($MAX_CACHE_SIZE bytes). Cleaning up..."
  clean_cache "$CACHE_DIR"
  echo "Cache cleaned."
fi
