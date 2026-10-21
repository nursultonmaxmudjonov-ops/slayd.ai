import pptxgen from 'pptxgenjs';
import { Slide, ThemeColors } from '../types';

/**
 * Professional Minimalist PowerPoint (.pptx) Generator
 * Strictly calibrated for 16:9 Widescreen standard (13.333 x 7.5 inches)
 */
export async function exportToPowerPoint(
  allSlides: Slide[],
  topic: string,
  theme: ThemeColors
): Promise<void> {
  const pptx = new pptxgen();

  // Standard Microsoft PowerPoint 16:9 Widescreen (13.333" x 7.5")
  pptx.defineLayout({ name: 'WIDE_16_9', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE_16_9';
  pptx.title = topic;
  pptx.subject = 'Professional Presentation by SlaydAI';
  pptx.company = 'SlaydAI';

  // Export only selected slides (if user toggled selections)
  const slides = allSlides.filter(s => s.selected !== false);
  const slidesToProcess = slides.length > 0 ? slides : allSlides;

  const { bg, cardBg, cardBorder, primary, accent, text, textMuted } = theme.pptx;
  const borderCol = cardBorder || (theme.id === 'minimalist' ? 'E2E8F0' : '1E293B');
  const fontMain = 'Segoe UI';

  for (let index = 0; index < slidesToProcess.length; index++) {
    const s = slidesToProcess[index];
    const slide = pptx.addSlide();
    slide.background = { color: bg };

    // Speaker notes
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }

    // Top Header Badge & Slide Title (except on cover title slide)
    if (s.layout !== 'title') {
      // Category / Badge Pill
      if (s.badge) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.9,
          y: 0.55,
          w: 1.4,
          h: 0.35,
          rectRadius: 0.08,
          fill: { color: primary }
        });
        slide.addText(s.badge.toUpperCase(), {
          x: 0.9,
          y: 0.55,
          w: 1.4,
          h: 0.35,
          fontSize: 9,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          valign: 'middle',
          fontFace: fontMain
        });
      }

      // Slide Title
      slide.addText(s.title, {
        x: 0.9,
        y: 0.98,
        w: 11.5,
        h: 0.72,
        fontSize: 24,
        bold: true,
        color: text,
        fontFace: fontMain
      });

      // Slide Subtitle
      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 0.9,
          y: 1.68,
          w: 11.5,
          h: 0.35,
          fontSize: 12.5,
          color: textMuted,
          fontFace: fontMain
        });
      }
    }

    // Slide Layout-Specific Renderers
    switch (s.layout) {
      case 'title': {
        // Minimalist Hero Card Frame
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.9,
          y: 0.9,
          w: 11.53,
          h: 5.7,
          rectRadius: 0.15,
          fill: { color: cardBg },
          line: { color: primary, width: 1.2 }
        });

        // Pill Badge
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 1.6,
          y: 1.6,
          w: 2.2,
          h: 0.4,
          rectRadius: 0.08,
          fill: { color: primary }
        });
        slide.addText(s.badge ? s.badge.toUpperCase() : 'SLAYDAI TAQDIMOT', {
          x: 1.6,
          y: 1.6,
          w: 2.2,
          h: 0.4,
          fontSize: 10,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          valign: 'middle',
          fontFace: fontMain
        });

        // Main Title
        slide.addText(s.title, {
          x: 1.6,
          y: 2.3,
          w: 7.2,
          h: 1.9,
          fontSize: 38,
          bold: true,
          color: text,
          fontFace: fontMain
        });

        // Subtitle
        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 1.6,
            y: 4.2,
            w: 7.2,
            h: 0.9,
            fontSize: 15,
            color: textMuted,
            fontFace: fontMain
          });
        }

        // Author / Date Pill
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 1.6,
          y: 5.3,
          w: 4.5,
          h: 0.45,
          rectRadius: 0.08,
          fill: { color: bg },
          line: { color: borderCol, width: 0.8 }
        });
        slide.addText(`Taqdimotchi: SlaydAI • ${new Date().toLocaleDateString('uz-UZ')}`, {
          x: 1.6,
          y: 5.3,
          w: 4.5,
          h: 0.45,
          fontSize: 11,
          color: textMuted,
          align: 'center',
          valign: 'middle',
          fontFace: fontMain
        });

        // Right Visual Frame (Image or Minimalist Geometric Graphic)
        if (s.showImage !== false) {
          const imgX = 9.0;
          const imgY = 1.6;
          const imgW = 2.8;
          const imgH = 4.3;

          let imageEmbedded = false;
          if (s.visualMode === 'photo' && s.imageUrl) {
            try {
              slide.addImage({
                path: s.imageUrl,
                x: imgX,
                y: imgY,
                w: imgW,
                h: imgH,
                rounding: true
              });
              imageEmbedded = true;
            } catch (err) {
              imageEmbedded = false;
            }
          }

          if (!imageEmbedded) {
            // Minimalist Native Vector Accent Card
            slide.addShape(pptx.ShapeType.roundRect, {
              x: imgX,
              y: imgY,
              w: imgW,
              h: imgH,
              rectRadius: 0.12,
              fill: { color: bg },
              line: { color: borderCol, width: 1 }
            });
            // Geometric glowing orb
            slide.addShape(pptx.ShapeType.ellipse, {
              x: imgX + 0.65,
              y: imgY + 1.2,
              w: 1.5,
              h: 1.5,
              fill: { color: primary },
              line: { color: accent, width: 1.5 }
            });
            slide.addShape(pptx.ShapeType.ellipse, {
              x: imgX + 1.1,
              y: imgY + 1.65,
              w: 0.6,
              h: 0.6,
              fill: { color: 'FFFFFF' }
            });
            // Bottom Accent Badge
            slide.addText('MINIMALIST AI', {
              x: imgX + 0.4,
              y: imgY + 3.4,
              w: 2.0,
              h: 0.35,
              fontSize: 10,
              bold: true,
              color: textMuted,
              align: 'center',
              fontFace: fontMain
            });
          }
        }
        break;
      }

      case 'bullets': {
        const points = s.points || [];
        const hasVisual = s.showImage !== false;
        const contentWidth = hasVisual ? 7.0 : 11.53;
        const startY = s.subtitle ? 2.2 : 2.0;
        const availableHeight = 4.4;
        const cardH = Math.min(0.95, (availableHeight - ((points.length - 1) * 0.18)) / (points.length || 1));

        points.forEach((point, pIdx) => {
          const curY = startY + (pIdx * (cardH + 0.18));

          // Bullet Card Container
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.9,
            y: curY,
            w: contentWidth,
            h: cardH,
            rectRadius: 0.09,
            fill: { color: cardBg },
            line: { color: borderCol, width: 0.8 }
          });

          // Number Pill
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 1.15,
            y: curY + (cardH / 2) - 0.18,
            w: 0.38,
            h: 0.36,
            rectRadius: 0.08,
            fill: { color: primary }
          });
          slide.addText(`${pIdx + 1}`, {
            x: 1.15,
            y: curY + (cardH / 2) - 0.18,
            w: 0.38,
            h: 0.36,
            fontSize: 10,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            valign: 'middle',
            fontFace: fontMain
          });

          // Bullet Text
          slide.addText(point, {
            x: 1.7,
            y: curY,
            w: contentWidth - 0.95,
            h: cardH,
            fontSize: 13,
            color: text,
            valign: 'middle',
            fontFace: fontMain
          });
        });

        // Right Visual Frame (if visual enabled)
        if (hasVisual) {
          const vX = 8.2;
          const vY = startY;
          const vW = 4.23;
          const vH = Math.max(3.2, Math.min(4.4, (points.length * (cardH + 0.18)) - 0.18));

          let imageEmbedded = false;
          if (s.visualMode === 'photo' && s.imageUrl) {
            try {
              slide.addImage({
                path: s.imageUrl,
                x: vX,
                y: vY,
                w: vW,
                h: vH,
                rounding: true
              });
              imageEmbedded = true;
            } catch (err) {
              imageEmbedded = false;
            }
          }

          if (!imageEmbedded) {
            // Minimalist AI Vector Visual Card
            slide.addShape(pptx.ShapeType.roundRect, {
              x: vX,
              y: vY,
              w: vW,
              h: vH,
              rectRadius: 0.12,
              fill: { color: cardBg },
              line: { color: borderCol, width: 1 }
            });
            // Decorative geometric accents
            slide.addShape(pptx.ShapeType.ellipse, {
              x: vX + (vW / 2) - 1.0,
              y: vY + (vH / 2) - 1.0,
              w: 2.0,
              h: 2.0,
              fill: { color: bg },
              line: { color: primary, width: 1.5 }
            });
            slide.addShape(pptx.ShapeType.ellipse, {
              x: vX + (vW / 2) - 0.4,
              y: vY + (vH / 2) - 0.4,
              w: 0.8,
              h: 0.8,
              fill: { color: accent }
            });
            // Minimalist label
            slide.addText('MINIMALIST AI VISUAL', {
              x: vX + 0.5,
              y: vY + vH - 0.6,
              w: vW - 1.0,
              h: 0.35,
              fontSize: 10,
              bold: true,
              color: textMuted,
              align: 'center',
              fontFace: fontMain
            });
          }
        }
        break;
      }

      case 'stats': {
        const stats = s.stats || [];
        const count = Math.min(stats.length, 4) || 3;
        const totalW = 11.53;
        const gap = 0.35;
        const cardW = (totalW - (count - 1) * gap) / count;
        const startX = 0.9;
        const curY = s.subtitle ? 2.2 : 2.0;
        const cardH = 4.3;

        stats.slice(0, count).forEach((stat, stIdx) => {
          const cX = startX + stIdx * (cardW + gap);

          // Card
          slide.addShape(pptx.ShapeType.roundRect, {
            x: cX,
            y: curY,
            w: cardW,
            h: cardH,
            rectRadius: 0.12,
            fill: { color: cardBg },
            line: { color: borderCol, width: 1 }
          });

          // Stat Value
          slide.addText(stat.value, {
            x: cX + 0.2,
            y: curY + 0.5,
            w: cardW - 0.4,
            h: 1.2,
            fontSize: count === 4 ? 40 : 48,
            bold: true,
            color: primary,
            align: 'center',
            fontFace: fontMain
          });

          // Stat Label
          slide.addText(stat.label, {
            x: cX + 0.25,
            y: curY + 1.8,
            w: cardW - 0.5,
            h: 1.2,
            fontSize: 15,
            bold: true,
            color: text,
            align: 'center',
            fontFace: fontMain
          });

          // Trend Pill
          if (stat.trend) {
            slide.addShape(pptx.ShapeType.roundRect, {
              x: cX + 0.4,
              y: curY + 3.3,
              w: cardW - 0.8,
              h: 0.45,
              rectRadius: 0.08,
              fill: { color: bg },
              line: { color: borderCol, width: 0.5 }
            });
            slide.addText(stat.trend, {
              x: cX + 0.4,
              y: curY + 3.3,
              w: cardW - 0.8,
              h: 0.45,
              fontSize: 10.5,
              color: textMuted,
              align: 'center',
              valign: 'middle',
              fontFace: fontMain
            });
          }
        });
        break;
      }

      case 'compare': {
        const compare = s.compare || {
          leftTitle: 'Avvalgi Usul',
          leftItems: [],
          rightTitle: 'Zamonaviy Usul',
          rightItems: []
        };

        const colW = 5.5;
        const curY = s.subtitle ? 2.2 : 2.0;
        const colH = 4.3;

        // Left Column (Before / Traditional)
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.9,
          y: curY,
          w: colW,
          h: colH,
          rectRadius: 0.12,
          fill: { color: cardBg },
          line: { color: borderCol, width: 0.8 }
        });
        slide.addText(compare.leftTitle, {
          x: 1.2,
          y: curY + 0.35,
          w: colW - 0.6,
          h: 0.5,
          fontSize: 17,
          bold: true,
          color: text,
          fontFace: fontMain
        });

        compare.leftItems.forEach((item, idx) => {
          slide.addText(`•  ${item}`, {
            x: 1.2,
            y: curY + 1.0 + idx * 0.85,
            w: colW - 0.6,
            h: 0.75,
            fontSize: 13,
            color: textMuted,
            fontFace: fontMain
          });
        });

        // Right Column (Modern / Solution)
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 6.93,
          y: curY,
          w: colW,
          h: colH,
          rectRadius: 0.12,
          fill: { color: cardBg },
          line: { color: primary, width: 1.8 }
        });
        slide.addText(compare.rightTitle, {
          x: 7.23,
          y: curY + 0.35,
          w: colW - 0.6,
          h: 0.5,
          fontSize: 17,
          bold: true,
          color: primary,
          fontFace: fontMain
        });

        compare.rightItems.forEach((item, idx) => {
          slide.addText(`✔  ${item}`, {
            x: 7.23,
            y: curY + 1.0 + idx * 0.85,
            w: colW - 0.6,
            h: 0.75,
            fontSize: 13,
            color: text,
            fontFace: fontMain
          });
        });
        break;
      }

      case 'timeline': {
        const steps = s.timeline || [];
        const count = Math.min(steps.length, 4) || 4;
        const totalW = 11.53;
        const gap = 0.3;
        const cardW = (totalW - (count - 1) * gap) / count;
        const curY = s.subtitle ? 2.2 : 2.0;
        const cardH = 4.3;

        // Connecting Progress Line
        slide.addShape(pptx.ShapeType.line, {
          x: 1.2,
          y: curY + 0.45,
          w: totalW - 0.6,
          h: 0,
          line: { color: primary, width: 1.5, dashType: 'dash' }
        });

        steps.slice(0, 4).forEach((st, idx) => {
          const cX = 0.9 + idx * (cardW + gap);

          // Card
          slide.addShape(pptx.ShapeType.roundRect, {
            x: cX,
            y: curY,
            w: cardW,
            h: cardH,
            rectRadius: 0.12,
            fill: { color: cardBg },
            line: { color: borderCol, width: 1 }
          });

          // Step Pill
          slide.addShape(pptx.ShapeType.roundRect, {
            x: cX + 0.25,
            y: curY + 0.3,
            w: 1.0,
            h: 0.35,
            rectRadius: 0.08,
            fill: { color: primary }
          });
          slide.addText(st.step || `0${idx + 1}`, {
            x: cX + 0.25,
            y: curY + 0.3,
            w: 1.0,
            h: 0.35,
            fontSize: 11,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            valign: 'middle',
            fontFace: fontMain
          });

          // Step Title
          slide.addText(st.title, {
            x: cX + 0.25,
            y: curY + 0.85,
            w: cardW - 0.5,
            h: 0.8,
            fontSize: 14.5,
            bold: true,
            color: text,
            fontFace: fontMain
          });

          // Step Description
          slide.addText(st.description, {
            x: cX + 0.25,
            y: curY + 1.8,
            w: cardW - 0.5,
            h: 2.2,
            fontSize: 11.5,
            color: textMuted,
            fontFace: fontMain
          });
        });
        break;
      }

      case 'quote': {
        const quote = s.quote || {
          text: 'Har qanday yangilik katta qadamdan boshlanadi.',
          author: 'Muallif',
          role: 'Mutaxassis'
        };

        const curY = s.subtitle ? 2.2 : 2.0;

        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.9,
          y: curY,
          w: 11.53,
          h: 4.3,
          rectRadius: 0.15,
          fill: { color: cardBg },
          line: { color: primary, width: 1.2 }
        });

        slide.addText('“', {
          x: 1.5,
          y: curY + 0.3,
          w: 1.5,
          h: 0.9,
          fontSize: 60,
          bold: true,
          color: primary,
          fontFace: fontMain
        });

        slide.addText(quote.text, {
          x: 1.8,
          y: curY + 1.1,
          w: 9.8,
          h: 1.8,
          fontSize: 21,
          italic: true,
          color: text,
          fontFace: fontMain
        });

        slide.addText(`— ${quote.author}`, {
          x: 1.8,
          y: curY + 3.1,
          w: 9.8,
          h: 0.45,
          fontSize: 15,
          bold: true,
          color: primary,
          fontFace: fontMain
        });

        if (quote.role) {
          slide.addText(quote.role, {
            x: 1.8,
            y: curY + 3.55,
            w: 9.8,
            h: 0.35,
            fontSize: 12,
            color: textMuted,
            fontFace: fontMain
          });
        }
        break;
      }

      case 'conclusion': {
        const conc = s.conclusion || {
          mainMessage: "E'tiboringiz uchun rahmat!",
          takeaways: ['Asosiy xulosalar jamlandi'],
          callToAction: 'Savollar uchun marhamat!'
        };

        const curY = s.subtitle ? 2.2 : 2.0;

        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.9,
          y: curY,
          w: 11.53,
          h: 4.3,
          rectRadius: 0.15,
          fill: { color: cardBg },
          line: { color: primary, width: 1.2 }
        });

        slide.addText(conc.mainMessage, {
          x: 1.4,
          y: curY + 0.4,
          w: 10.5,
          h: 0.8,
          fontSize: 20,
          bold: true,
          color: text,
          fontFace: fontMain
        });

        (conc.takeaways || []).forEach((item, idx) => {
          slide.addText(`✔  ${item}`, {
            x: 1.4,
            y: curY + 1.3 + idx * 0.55,
            w: 10.5,
            h: 0.45,
            fontSize: 13.5,
            color: textMuted,
            fontFace: fontMain
          });
        });

        // Call to action button banner
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 1.4,
          y: curY + 3.2,
          w: 10.5,
          h: 0.65,
          rectRadius: 0.09,
          fill: { color: primary }
        });
        slide.addText(conc.callToAction, {
          x: 1.4,
          y: curY + 3.2,
          w: 10.5,
          h: 0.65,
          fontSize: 14,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          valign: 'middle',
          fontFace: fontMain
        });
        break;
      }
    }

    // Professional Minimalist Footer on Every Slide
    slide.addShape(pptx.ShapeType.line, {
      x: 0.9,
      y: 6.75,
      w: 11.53,
      h: 0,
      line: { color: borderCol, width: 0.6 }
    });

    slide.addText('SlaydAI  •  Professional Taqdimot', {
      x: 0.9,
      y: 6.85,
      w: 6.5,
      h: 0.35,
      fontSize: 10,
      color: textMuted,
      fontFace: fontMain
    });

    slide.addText(`${index + 1} / ${slidesToProcess.length}`, {
      x: 9.9,
      y: 6.85,
      w: 2.53,
      h: 0.35,
      fontSize: 10,
      color: textMuted,
      align: 'right',
      fontFace: fontMain
    });
  }

  const sanitized = topic.replace(/[^a-zA-Z0-9\u0400-\u04FF\s_-]/g, '').trim() || 'Taqdimot';
  await pptx.writeFile({ fileName: `${sanitized}_taqdimot.pptx` });
}
