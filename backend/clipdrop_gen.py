clipdropapi = "bb30abb10013b4ce9af0733733a09b70c587cedb861642073222c07401570e13f3c99af8338886c8d24a8287d01b7ff1"
import requests
import os
import glob

def clipdrop_get_image(prompt_string):
    clipdropapi = "bb30abb10013b4ce9af0733733a09b70c587cedb861642073222c07401570e13f3c99af8338886c8d24a8287d01b7ff1"
    r = requests.post('https://clipdrop-api.co/text-to-image/v1',
    files = {
        'prompt': ("", prompt_string, 'text/plain')
    },
    headers = { 'x-api-key': clipdropapi}
    )
    if (r.ok):
        # r.content contains the bytes of the returned image
        image=r.content
        return image
    else:
        r.raise_for_status()
    