#!/bin/bash
echo "Starting container. Run time environment:${environment} from .env file "
pm2-runtime reload ecosystem.config.cjs --env ${environment}