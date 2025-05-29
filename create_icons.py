#!/usr/bin/env python3
"""
Generate PWA icons for Ayman Aboghonim's blog
Creates simple but professional icons using PIL/Pillow
"""

import os
import sys
from pathlib import Path

# Required icon sizes for PWA
ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# Paths
SCRIPT_DIR = Path(__file__).parent
ASSETS_DIR = SCRIPT_DIR / "assets" / "images"

def create_professional_icons():
    """Create professional-looking PNG icons with gradients"""
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        for size in ICON_SIZES:
            # Create a new image with transparent background
            img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            
            # Create a circular background with gradient effect
            center = size // 2
            radius = center - max(2, size // 32)  # Small border
            
            # Create multiple circles for gradient effect (from dark to light blue)
            gradient_steps = 20
            for i in range(gradient_steps):
                # Calculate color for this step
                progress = i / gradient_steps
                r = int(74 + (83 - 74) * progress)    # 74->83 (4A->53)
                g = int(144 + (171 - 144) * progress) # 144->171 (90->AB)
                b = int(226 + (237 - 226) * progress) # 226->237 (E2->ED)
                color = (r, g, b, 255)
                
                # Draw circle with slightly smaller radius for each step
                step_radius = radius - (i * radius // (gradient_steps * 2))
                if step_radius > 0:
                    draw.ellipse([
                        center - step_radius, center - step_radius,
                        center + step_radius, center + step_radius
                    ], fill=color)
            
            # Calculate font size proportional to icon size
            font_size = max(size // 5, 20)
            
            # Try to load a nice font, fall back to default
            font = None
            font_names = ['arial.ttf', 'Arial.ttf', 'calibri.ttf', 'segoeui.ttf']
            for font_name in font_names:
                try:
                    font = ImageFont.truetype(font_name, font_size)
                    break
                except:
                    continue
            
            if font is None:
                try:
                    font = ImageFont.load_default()
                except:
                    # Ultimate fallback - no text
                    pass
            
            # Draw "AA" initials in the center
            if font:
                text = "AA"
                # Get text bounding box
                bbox = draw.textbbox((0, 0), text, font=font)
                text_width = bbox[2] - bbox[0]
                text_height = bbox[3] - bbox[1]
                
                x = (size - text_width) // 2
                y = (size - text_height) // 2
                
                # Draw text with shadow for depth
                shadow_offset = max(1, size // 128)
                if shadow_offset > 0:
                    draw.text((x + shadow_offset, y + shadow_offset), text, 
                             fill=(0, 0, 0, 100), font=font)  # Semi-transparent shadow
                
                draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
            
            # Add a subtle border
            border_width = max(1, size // 64)
            if border_width > 0:
                for i in range(border_width):
                    draw.ellipse([
                        i, i, size - 1 - i, size - 1 - i
                    ], outline=(255, 255, 255, 80), width=1)
            
            # Save the icon
            output_file = ASSETS_DIR / f"icon-{size}x{size}.png"
            img.save(output_file, 'PNG', optimize=True)
            print(f"✓ Generated {output_file.name}")
            
        return True
        
    except ImportError:
        print("❌ PIL (Pillow) not available. Installing...")
        return False
    except Exception as e:
        print(f"❌ Failed to create icons: {e}")
        return False

def install_pillow():
    """Install Pillow if not available"""
    try:
        import subprocess
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'pillow'], 
                      check=True, capture_output=True)
        print("✓ Installed Pillow")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install Pillow")
        return False

def main():
    """Main function to generate all PWA icons"""
    print("🎨 Generating PWA icons for Ayman Aboghonim's blog...")
    print(f"📁 Assets directory: {ASSETS_DIR}")
    
    # Ensure assets directory exists
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Try to create icons
    success = create_professional_icons()
    
    # If PIL not available, try to install it
    if not success:
        if install_pillow():
            success = create_professional_icons()
    
    if success:
        print(f"\n✅ Generated all {len(ICON_SIZES)} PWA icons successfully!")
        print("🎉 Icons are ready for your Progressive Web App!")
        
        # List generated files
        print("\n📋 Generated files:")
        for size in ICON_SIZES:
            icon_file = ASSETS_DIR / f"icon-{size}x{size}.png"
            if icon_file.exists():
                file_size = icon_file.stat().st_size
                print(f"   • icon-{size}x{size}.png ({file_size:,} bytes)")
        
        return True
    else:
        print("❌ Failed to generate icons")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
