from PIL import Image

def analyze(image_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    width, height = img.size
    
    mask = [[0]*width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            _, _, _, a = data[y * width + x]
            if a == 0:
                mask[y][x] = 1

    visited = [[False]*width for _ in range(height)]
    boxes = []

    for y in range(height):
        for x in range(width):
            if mask[y][x] == 1 and not visited[y][x]:
                queue = [(x, y)]
                visited[y][x] = True
                min_x, max_x = x, x
                min_y, max_y = y, y
                
                head = 0
                while head < len(queue):
                    cx, cy = queue[head]
                    head += 1
                    
                    if cx < min_x: min_x = cx
                    if cx > max_x: max_x = cx
                    if cy < min_y: min_y = cy
                    if cy > max_y: max_y = cy
                    
                    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
                        if 0 <= nx < width and 0 <= ny < height:
                            if mask[ny][nx] == 1 and not visited[ny][nx]:
                                visited[ny][nx] = True
                                queue.append((nx, ny))
                
                if (max_x - min_x) > 50 and (max_y - min_y) > 50:
                    boxes.append({
                        "left": min_x,
                        "top": min_y,
                        "width": max_x - min_x + 1,
                        "height": max_y - min_y + 1,
                        "left_pct": min_x / width * 100,
                        "top_pct": min_y / height * 100,
                        "width_pct": (max_x - min_x + 1) / width * 100,
                        "height_pct": (max_y - min_y + 1) / height * 100
                    })

    boxes.sort(key=lambda b: b['top'])
    print(f"File: {image_path.split('/')[-1]}")
    for i, b in enumerate(boxes):
        print(f"Box {i+1}: left: {b['left_pct']:.1f}%, top: {b['top_pct']:.1f}%, width: {b['width_pct']:.1f}%, height: {b['height_pct']:.1f}%")

analyze("/Users/genefied/Projects/61C/client/public/horizontal filmroll.png")
analyze("/Users/genefied/Projects/61C/client/public/verticalFilmroll.png")
