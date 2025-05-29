#!/usr/bin/env python3
"""
Generate PWA icons from SVG avatar for Ayman Aboghonim's blog
Creates all required icon sizes referenced in manifest.json
"""

import os
import subprocess
import sys
from pathlib import Path

# Required icon sizes for PWA
ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# Paths
SCRIPT_DIR = Path(__file__).parent
ASSETS_DIR = SCRIPT_DIR / "assets" / "images"
AVATAR_SVG = ASSETS_DIR / "avatar.svg"

def check_dependencies():
    """Check if required dependencies are available"""
    try:
        # Check if Inkscape is available
        result = subprocess.run(['inkscape', '--version'], 
                              capture_output=True, text=True, check=True)
        print(f"✓ Inkscape found: {result.stdout.strip()}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Inkscape not found. Trying alternative methods...")
        return False

def generate_icon_with_inkscape(size):
    """Generate icon using Inkscape (most reliable)"""
    output_file = ASSETS_DIR / f"icon-{size}x{size}.png"
    
    cmd = [
        'inkscape',
        '--export-type=png',
        f'--export-filename={output_file}',
        f'--export-width={size}',
        f'--export-height={size}',
        str(AVATAR_SVG)
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        print(f"✓ Generated {output_file.name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to generate {size}x{size}: {e}")
        return False

def generate_icon_with_cairosvg(size):
    """Generate icon using cairosvg (Python library)"""
    try:
        import cairosvg
        from PIL import Image
        import io
        
        output_file = ASSETS_DIR / f"icon-{size}x{size}.png"
        
        # Convert SVG to PNG using cairosvg
        png_data = cairosvg.svg2png(
            url=str(AVATAR_SVG),
            output_width=size,
            output_height=size
        )
        
        # Save the PNG
        with open(output_file, 'wb') as f:
            f.write(png_data)
        
        print(f"✓ Generated {output_file.name}")
        return True
        
    except ImportError:
        print("❌ cairosvg not available. Install with: pip install cairosvg")
        return False
    except Exception as e:
        print(f"❌ Failed to generate {size}x{size} with cairosvg: {e}")
        return False

def install_cairosvg():
    """Install cairosvg if not available"""
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'cairosvg', 'pillow'], 
                      check=True, capture_output=True)
        print("✓ Installed cairosvg and pillow")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install cairosvg")
        return False

def create_fallback_icons():
    """Create simple PNG icons as fallback"""
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        for size in ICON_SIZES:
            # Create a new image with blue background
            img = Image.new('RGBA', (size, size), (74, 144, 226, 255))
            draw = ImageDraw.Draw(img)
            
            # Calculate font size proportional to icon size
            font_size = max(size // 8, 12)
            
            try:
                # Try to use a system font
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                # Fall back to default font
                font = ImageFont.load_default()
            
            # Draw "AA" initials in the center
            text = "AA"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            x = (size - text_width) // 2
            y = (size - text_height) // 2
            
            draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
            
            # Save the icon
            output_file = ASSETS_DIR / f"icon-{size}x{size}.png"
            img.save(output_file, 'PNG')
            print(f"✓ Generated fallback {output_file.name}")
            
        return True
        
    except ImportError:
        print("❌ PIL (Pillow) not available for fallback icons")
        return False
    except Exception as e:
        print(f"❌ Failed to create fallback icons: {e}")
        return False

def main():
    """Main function to generate all PWA icons"""
    print("🎨 Generating PWA icons for Ayman Aboghonim's blog...")
    print(f"📁 Assets directory: {ASSETS_DIR}")
    print(f"🖼️  Source SVG: {AVATAR_SVG}")
    
    # Ensure assets directory exists
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Check if source SVG exists
    if not AVATAR_SVG.exists():
        print(f"❌ Avatar SVG not found: {AVATAR_SVG}")
        return False
    
    success_count = 0
    
    # Try Inkscape first (best quality)
    if check_dependencies():
        for size in ICON_SIZES:
            if generate_icon_with_inkscape(size):
                success_count += 1
    
    # If Inkscape failed, try cairosvg
    if success_count == 0:
        print("\n🔄 Trying cairosvg method...")
        
        # Try to install cairosvg if not available
        try:
            import cairosvg
        except ImportError:
            print("📦 Installing cairosvg...")
            if not install_cairosvg():
                print("❌ Could not install cairosvg")
            
        for size in ICON_SIZES:
            if generate_icon_with_cairosvg(size):
                success_count += 1
    
    # Final fallback - create simple PNG icons
    if success_count == 0:
        print("\n🔄 Creating fallback PNG icons...")
        if create_fallback_icons():
            success_count = len(ICON_SIZES)
    
    print(f"\n✅ Generated {success_count}/{len(ICON_SIZES)} icons")
    
    if success_count == len(ICON_SIZES):
        print("🎉 All PWA icons generated successfully!")
        return True
    else:
        print(f"⚠️  {len(ICON_SIZES) - success_count} icons could not be generated")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
