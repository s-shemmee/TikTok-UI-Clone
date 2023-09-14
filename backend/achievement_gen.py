import json
import openai
def getgpt(date = "5th of October", product  = "mouse"):
    prompt = f"""
        i want to create an achievement from a special occasion in a timeframe for consumers buying the following product {product}. Today is {date}, I want you to associate this date with the 
        closest celebration on earth. Give me a cool name for the achievement that is gamified. I want a 50 word description of how cool it is to get this achievement and ask them to share it with their friends. 
        Tell me what the occasion is in the python dictionary below

        Give me the following information in a python dictionary only

        1) Name of the Achievement
        2) Description of the achievement
        3) Occasion
        4) Product Type

        """
    openai.api_key = "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"
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )
    answer = json.loads(str(completion))
    content = answer["choices"][0]["message"]["content"]
    with open ("answer.txt" , "w") as file:
        file.write(str(content))
    print(content)
    return content