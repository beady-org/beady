# Part of Beady. See LICENSE file for full copyright and licensing details.

from . import controllers
from . import models

from beady.http import request


def _post_init_hook(env):
    if request:
        request.is_frontend = False
        request.is_frontend_multilang = False
