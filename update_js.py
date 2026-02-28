import os
import glob
import re

image_dir = 'e:/my web/santhosh_portfolio/images'
script_file = 'e:/my web/santhosh_portfolio/script.js'

images = glob.glob(os.path.join(image_dir, '*.jpg'))
images.sort(reverse=True) # newest first

art_works = []
ig_posts = []

# Deduplicate by base name (e.g. 2024-10-27_11-32-48_UTC)
# If _1, _2 exist, just take _1 or all? MASONRY grid can take all.
for img in images:
    filename = os.path.basename(img)
    base = filename.replace('.jpg', '')
    if base.endswith('_1') or base.endswith('_2') or base.endswith('_3'):
        txt_base = base[:-2]
    else:
        txt_base = base

    txt_file = os.path.join(image_dir, txt_base + '.txt')

    desc = "Artwork by Santhosh Dream Drawing"
    title = "Detailed Sketch"

    if os.path.exists(txt_file):
        with open(txt_file, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            if content:
                # remove hashtags
                clean_desc = re.sub(r'#\w+', '', content).strip()
                if clean_desc:
                    desc = clean_desc.replace('\n', ' ').replace("'", "\\'")
                    # Take first few words as title
                    words = desc.split()
                    title = " ".join(words[:4]) + ("..." if len(words)>4 else "")

    img_path = f"images/{filename}"

    art_works.append(f"""    {{ title: '{title}', desc: '{desc}', src: '{img_path}' }}""")
    ig_posts.append(f"    '{img_path}'")

art_works_str = "const artWorks = [\n" + ",\n".join(art_works) + "\n];"
ig_posts_str = "const igPosts = [\n" + ",\n".join(ig_posts[:8]) + "\n];"

with open(script_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace artWorks array
js_content = re.sub(r'const artWorks = \[.*?\];', art_works_str, js_content, flags=re.DOTALL)

# Replace igPosts array
js_content = re.sub(r'const igPosts = \[.*?\];', ig_posts_str, js_content, flags=re.DOTALL)

with open(script_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updated script.js successfully!")
