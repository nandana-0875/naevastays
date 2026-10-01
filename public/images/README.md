# Naeve Stay photo handoff

The site is wired to these replaceable filenames. Add the user's own photographs here without changing the page layout; the site automatically detects the files and swaps them in for the neutral placeholder artwork.

| Area | Suggested files |
| --- | --- |
| Hero | `hero.jpg` |
| Property exterior / welcome | `property-exterior.jpg`, `property-detail.jpg` |
| Rooms | `room-1.jpg`, `room-2.jpg`, `room-3.jpg`, `room-detail.jpg`, `room-window.jpg` |
| Kitchen | `kitchen.jpg`, `kitchen-detail.jpg`, `kitchen-dining.jpg` |
| Bathrooms | `bathroom-1.jpg`, `bathroom-2.jpg`, `bathroom-detail.jpg` |
| Terrace | `terrace-1.jpg`, `terrace-2.jpg`, `terrace-view.jpg` |
| Balcony | `balcony.jpg`, `balcony-detail.jpg` |
| Common / dining | `common-area.jpg`, `dining-area.jpg`, `common-detail.jpg` |
| Varkala | `varkala-cliff.jpg`, `varkala-beach.jpg`, `varkala-cafe.jpg`, `varkala-street.jpg`, `varkala-local.jpg` |

Supported formats are JPG, PNG, and WebP. Keep the filenames exactly as listed; `script.js` uses each placeholder's `data-src` value to test for the real file on page load. Replace the placeholder SVG only when you have the matching photo, and keep the alt text accurate to what the photo shows.
