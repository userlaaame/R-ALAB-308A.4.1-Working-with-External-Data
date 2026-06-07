# R-ALAB 308A.4.1 — Working with External Data

An interactive cat breed explorer built with vanilla JavaScript, Fetch, and Axios. Pulls live data from [The Cat API](https://thecatapi.com) to display breed images in a carousel, show breed info, and manage a personal favourites list.

---

## Table of Contents

- [Objectives](#objectives)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Tasks Overview](#tasks-overview)
- [Notes](#notes)

---

## Objectives

- Request data from an external API using `fetch` and `Axios`
- Build an interactive, dynamic webpage served from an external API
- Use `async/await` and Promises to handle asynchronous logic
- `POST` and `DELETE` data to/from an external API

---

## Tech Stack

- HTML / CSS / JavaScript (ES Modules)
- [Axios](https://axios-http.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [The Cat API](https://thecatapi.com)

---

## Features

- Browse all cat breeds from a dropdown selector
- View a carousel of images for the selected breed
- Display breed info (origin, temperament, life span)
- Progress bar and cursor indicator during API requests
- Favourite and unfavourite images with toggle behavior
- View all favourited images on demand

---

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "R-ALAB 308A.4.1 - Working with External Data"
   ```

2. Add your API key to `keys.js`:
   ```js
   export const API_KEY = "your_api_key_here";
   ```
   Get a free key at [thecatapi.com](https://thecatapi.com).

3. Open `index.html` in your browser or serve it with a local dev server.

---

## Project Structure

```
├── index.html          # Main HTML layout
├── styles.css          # Custom styles
├── index.js            # Fetch-based implementation
├── index-axios.js      # Axios-based implementation
├── Carousel.js         # Carousel helper module
├── keys.js             # API key (not committed)
└── README.md
```

---

## Tasks Overview

| # | Task | Description |
|---|------|-------------|
| 1 | `initialLoad()` | Fetch all breeds, populate the `<select>` dropdown |
| 2 | `breedSelect` handler | Fetch breed images, build carousel, show breed info |
| 3 | Axios migration | Rewrite fetch calls using Axios with default headers |
| 4 | Interceptors | Log request/response time via Axios interceptors |
| 5 | Progress bar | Use `onDownloadProgress` to animate a progress bar |
| 6 | Cursor indicator | Set cursor to `progress` on request, `default` on response |
| 7 | `favourite()` | Toggle favourite status via POST/DELETE to the API |
| 8 | `getFavourites()` | Fetch and display all favourited images in the carousel |

---

## Notes

- Not all breeds have images available — the code handles empty responses gracefully.
- The Malayan breed is a known edge case worth testing.
- `favourite()` is exported because `Carousel.js` binds it to the heart button on each carousel item.
- Error handling is a known improvement area for future iterations.
