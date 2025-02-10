# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

{
    'name': 'BeadyBot',
    'version': '1.2',
    'category': 'Productivity/Discuss',
    'summary': 'Add BeadyBot in discussions',
    'website': 'https://www.beady.org/app/discuss',
    'depends': ['mail'],
    'auto_install': True,
    'installable': True,
    'data': [
        'views/res_users_views.xml',
        'data/mailbot_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mail_bot/static/src/scss/beadybot_style.scss',
        ],
    },
    'license': 'LGPL-3',
}
