import { getPlaiceholder } from 'plaiceholder'

// Kiểm tra xem file có phải là ảnh (trừ SVG) để tạo BlurHash không
export function isEligibleForBlurHashUrl(mime?: string | null): boolean {
  if (!mime) return false

  const eligibleMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/tiff']

  return eligibleMimeTypes.includes(mime)
}

// Hàm tạo blurhash url
export async function generateBlurHashUrl(buffer: Buffer): Promise<string | null> {
  if (!buffer) return null

  try {
    const { base64 } = await getPlaiceholder(buffer)
    return base64
  } catch (err) {
    throw err
  }
}
