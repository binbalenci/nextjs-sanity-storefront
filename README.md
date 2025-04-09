# Next.js Product Catalog with Sanity CMS

A modern product catalog built with Next.js and Sanity CMS, featuring server-side rendering, image optimization, and real-time filtering.

## Features

- Server-side rendering with Next.js
- Content management with Sanity CMS
- Real-time product filtering
- Responsive design
- Image optimization
- Type-safe queries

## Screenshots

![Screenshot 1][screenshot1]
![Screenshot 2][screenshot2]
![Screenshot 3][screenshot3]
![Screenshot 4][screenshot4]

[screenshot1]: https://github.com/binbalenci/nextjs-sanity-storefront/raw/main/public/screenshots/1.png "Screenshot 1"
[screenshot2]: https://github.com/binbalenci/nextjs-sanity-storefront/raw/main/public/screenshots/2.png "Screenshot 2"
[screenshot3]: https://github.com/binbalenci/nextjs-sanity-storefront/raw/main/public/screenshots/3.png "Screenshot 3"
[screenshot4]: https://github.com/binbalenci/nextjs-sanity-storefront/raw/main/public/screenshots/4.png "Screenshot 4"

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Sanity account and project

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/binbalenci/nextjs-sanity-storefront.git
   cd nextjs-sanity-storefront
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset_id
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the following environment variables in Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
4. Deploy!

## Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset (defaults to 'production')
- `SANITY_API_TOKEN`: Your Sanity API token for write access

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── [slug]/            # Dynamic routes
├── sanity/                # Sanity configuration
└── components/            # React components
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
