# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import models, fields


class Challenge(models.Model):
    _inherit = 'gamification.challenge'

    challenge_category = fields.Selection(selection_add=[
        ('certification', 'Certifications')
    ], ondelete={'certification': 'set default'})
