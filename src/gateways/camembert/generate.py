from transformers import CamembertModel, CamembertTokenizer, pipeline
from pydantic import BaseModel
from typing import Optional
from enum import Enum
import random

tokenizer = CamembertTokenizer.from_pretrained("camembert-base")
camembert = CamembertModel.from_pretrained("camembert-base")
camembert.eval()

class Token(BaseModel):
    token_str: str
    token: int
    score: float
    sequence: str
    generation_pattern: int
    next_token: Optional["Token"] = None
    #is_offer: Optional[bool] = None

# You can replace "camembert-base" with any other model from the table, e.g. "camembert/camembert-large".
#tokenizer = CamembertTokenizer.from_pretrained("camembert-base")
#camembert = CamembertModel.from_pretrained("camembert-base")
#camembert.eval()  # disable dropout (or leave in train mode to finetune)
#camembert_fill_mask = pipeline("fill-mask", model="camembert-base", tokenizer="camembert-base")

class Generator :
    model:str = "camembert-base"
    tokenizer:str ="camembert-base"
    suggestion_tree: list = []    
    patterns = [
        '<mask>',
        'le <mask>',
        'la <mask>',
        'les <mask>',
        'des <mask>',
        '<mask> et',
        '<mask> du',
    ]

    black_list = [
        '(...)',
        '...',
        '....',
        '[...]',
        '<unk>',
        '..'
    ]

    stop_tokens=[ '.', '!', '»', ':', '!!', '!!!', '-', ':)', '».', ';', '>>']

    def __init__ (self, input_text:str, max_suggestions:int=5):
        self.input_text = input_text
        self.max_suggestions = max_suggestions
        self.suggestion_tree = []        
        self.fill_mask = pipeline("fill-mask", model=self.model, tokenizer=self.tokenizer)

    def includes_stop_token(self, text):
        for stop_token in self.stop_tokens:
            if stop_token in text :
                return True
        return False

    def build_suggestion_nodes(self, generation_pattern, input_text_with_mask):
        suggestions = self.fill_mask(input_text_with_mask)
        return [ Token(
                token_str=s['token_str'],
                token=s['token'],
                score=s['score'],
                sequence=s['sequence'],
                generation_pattern=generation_pattern   
            ) for s in suggestions if s['token_str'] not in self.black_list ]
    
    def fill_node(self, node, max_depth, already_used_token=[]):
        add_point = " ." if max_depth == 0 else ""
        suggestions = self.build_suggestion_nodes(node.generation_pattern, node.sequence + ' <mask>' + add_point)
        random.shuffle(suggestions)
        suggestion_indice = len(suggestions) -1
        while suggestion_indice >= 0 :
            if (
                not self.includes_stop_token(suggestions[suggestion_indice].token_str) 
                and suggestions[suggestion_indice].token_str.lower() != node.token_str.lower() 
                and suggestions[suggestion_indice].token_str.lower() not in already_used_token 
            ) :

                node.next_token = suggestions[suggestion_indice]
                if max_depth > 0:
                    self.fill_node(suggestions[suggestion_indice], max_depth-1, already_used_token + [suggestions[suggestion_indice].token_str.lower()])
                    return
            suggestion_indice -= 1

    def build_suggestion_tree(self):
        for i, pattern in enumerate(self.patterns):
            self.suggestion_tree += self.build_suggestion_nodes(i,self.input_text + "Ma boutique s'appelle : " + pattern)
        random.shuffle(self.suggestion_tree)
        for suggestion in self.suggestion_tree:
            self.fill_node(suggestion, 3, [suggestion.token_str.lower()])
        self.suggestion_tree = [s for s in self.suggestion_tree if s.next_token]
        #print(self.suggestion_tree)
        print('Nb de suggestions : {}'.format(len(self.suggestion_tree)))

    def next_tokens(self, node):
        if node.next_token:
            return node.next_token.token_str + " " + self.next_tokens(node.next_token)
        else:
            return ""

    def build_sentences(self):
        self.build_suggestion_tree()
        return [ self.patterns[node.generation_pattern].replace("<mask>", node.token_str) + " " + self.next_tokens(node) 
            for node in self.suggestion_tree
        ]
        
            #print([r['token_str'] for r in results if r['token_str'] not in black_list ])
            #for result in results:
            #    phrase = result['sequence'] + ' <mask>' 
            #    for i in range (0,5):
            #        r2 = camembert_fill_mask(phrase)
            #        phrase = r2[0]['sequence'] + ' <mask>'
            #    print(phrase)
            

print(Generator('Je vends des produits cosmétiques fabriqués à partir de produits naturels Corses.').build_sentences())
print(Generator('Je vends des pneus de voiture pour rouler en toute sécurité sous la pluie et la neige.').build_sentences())
