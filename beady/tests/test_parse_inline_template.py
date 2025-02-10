# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady.tests import BaseCase
from beady.tools.rendering_tools import parse_inline_template

class TestParseInlineTemplate(BaseCase):
    def test_no_expression(self):
        text = 'a b c'
        self.assertEqual(parse_inline_template(text), [('a b c', '')])

    def test_expression1(self):
        text = 'a {{b}}'
        self.assertEqual(parse_inline_template(text), [('a ', 'b')])

    def test_expression2(self):
        text = 'a {{b}} c'
        self.assertEqual(parse_inline_template(text), [('a ', 'b'), (' c', '')])
