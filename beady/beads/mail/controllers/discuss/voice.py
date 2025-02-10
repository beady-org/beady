# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import http
from beady.http import request
from beady.tools import file_open


class VoiceController(http.Controller):

    @http.route("/discuss/voice/worklet_processor", methods=["GET"], type="http", auth="public", readonly=True)
    def voice_worklet_processor(self):
        return request.make_response(
            file_open("mail/static/src/discuss/voice_message/worklets/processor.js", "rb").read(),
            headers=[
                ("Content-Type", "application/javascript"),
            ],
        )
