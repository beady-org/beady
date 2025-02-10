# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

""" Beads module.

This module serves to contain all Beady beads, across all configured beads
paths. For the code to manage those beads, see beady.modules.

Beads are made available under `beady.beads` after
beady.tools.config.parse_config() is called (so that the beads paths are
known).

This module also conveniently reexports some symbols from beady.modules.
Importing them from here is deprecated.

"""
# make beady.beads a namespace package, while keeping this __init__.py
# present, for python 2 compatibility
# https://packaging.python.org/guides/packaging-namespace-packages/
import pkgutil
import os.path
__path__ = [
    os.path.abspath(path)
    for path in pkgutil.extend_path(__path__, __name__)
]
