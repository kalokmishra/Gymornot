from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

WIDTH, HEIGHT = letter

TITLE = "GymOrNot.com"
SUBTITLE = "Is your membership investment or just a donation?"
DESCRIPTION = (
    "Discover your gym truth with a fast, honest quiz and a streak-tracking dashboard. "
    "Beautiful, bold, and built for people who want fitness clarity."
)
FEATURES = [
    "4-question diagnostic with real verdicts",
    "Riff-free dashboard for daily streaks",
    "High-contrast, modern poster styling",
    "Fast deployment on Vercel with Next.js & Tailwind",
]
URL = "https://gymornot-five.vercel.app"


def draw_header(c):
    c.setFillColor(colors.HexColor("#111827"))
    c.rect(0, HEIGHT - 1.75 * inch, WIDTH, 1.75 * inch, fill=True, stroke=False)
    c.setFillColor(colors.HexColor("#10B981"))
    c.setFont("Helvetica-Bold", 48)
    c.drawString(0.75 * inch, HEIGHT - 1.05 * inch, TITLE)
    c.setFillColor(colors.white)
    c.setFont("Helvetica", 16)
    c.drawString(0.75 * inch, HEIGHT - 1.45 * inch, SUBTITLE)


def draw_content(c):
    y = HEIGHT - 2.3 * inch
    c.setFillColor(colors.HexColor("#F9FAFB"))
    c.setFont("Helvetica-Bold", 28)
    c.drawString(0.75 * inch, y, "Launch Your Fitness Truth")

    y -= 0.45 * inch
    c.setFillColor(colors.HexColor("#D1D5DB"))
    c.setFont("Helvetica", 14)
    text = c.beginText(0.75 * inch, y)
    text.setLeading(18)
    text.textLines(DESCRIPTION)
    c.drawText(text)

    y -= 1.3 * inch
    c.setFillColor(colors.HexColor("#10B981"))
    c.roundRect(0.65 * inch, y - 0.15 * inch, WIDTH - 1.3 * inch, 0.35 * inch, 6, fill=True, stroke=False)
    c.setFillColor(colors.HexColor("#111827"))
    c.setFont("Helvetica-Bold", 16)
    c.drawString(0.85 * inch, y, "Ready for the real gym score?")

    y -= 0.7 * inch
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(0.75 * inch, y, "Features")

    y -= 0.35 * inch
    c.setFont("Helvetica", 13)
    for feature in FEATURES:
        c.drawString(0.9 * inch, y, "• " + feature)
        y -= 0.3 * inch

    y -= 0.2 * inch
    c.setStrokeColor(colors.HexColor("#10B981"))
    c.setLineWidth(1)
    c.line(0.75 * inch, y, WIDTH - 0.75 * inch, y)

    y -= 0.5 * inch
    c.setFillColor(colors.HexColor("#C084FC"))
    c.setFont("Helvetica-Bold", 20)
    c.drawString(0.75 * inch, y, "Visit the live experience:")
    y -= 0.3 * inch
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(colors.HexColor("#F8FAFD"))
    c.drawString(0.75 * inch, y, URL)


def draw_graphics(c):
    c.setFillColor(colors.HexColor("#8B5CF6"))
    c.roundRect(WIDTH - 3.5 * inch, HEIGHT - 5.1 * inch, 2.7 * inch, 3.4 * inch, 24, fill=True, stroke=False)
    c.setFillColor(colors.HexColor("#E0E7FF"))
    c.setFont("Helvetica-Bold", 20)
    c.drawString(WIDTH - 3.25 * inch, HEIGHT - 2.8 * inch, "GymOrNot")
    c.setFont("Helvetica", 12)
    c.drawString(WIDTH - 3.25 * inch, HEIGHT - 3.15 * inch, "Honest fitness checks, fast results.")
    c.setFillColor(colors.HexColor("#34D399"))
    c.circle(WIDTH - 2.2 * inch, HEIGHT - 5.25 * inch, 18, fill=True, stroke=False)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(WIDTH - 2.2 * inch, HEIGHT - 5.28 * inch, "Go")


def create_poster(output_path="GymOrNot_poster.pdf"):
    c = canvas.Canvas(output_path, pagesize=letter)
    c.setFillColor(colors.HexColor("#111827"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=True, stroke=False)
    draw_header(c)
    draw_content(c)
    draw_graphics(c)
    c.showPage()
    c.save()


if __name__ == "__main__":
    create_poster()
    print("Generated GymOrNot_poster.pdf")
