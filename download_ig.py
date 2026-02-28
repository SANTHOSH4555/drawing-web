import instaloader
import os
import shutil

L = instaloader.Instaloader(
    download_video_thumbnails=False,
    download_geotags=False,
    download_comments=False,
    save_metadata=False,
    compress_json=False,
    dirname_pattern='santhosh_portfolio/images'
)

profile = instaloader.Profile.from_username(L.context, "santhosh_dream_drawing")

os.makedirs('santhosh_portfolio/images', exist_ok=True)

posts = profile.get_posts()

count = 0
print("Downloading images...")
for post in posts:
    if post.is_video:
        continue
    L.download_post(post, target='santhosh_portfolio/images')
    count += 1
    if count >= 12:  # Get max 12 images
        break

print("Done downloading.")
