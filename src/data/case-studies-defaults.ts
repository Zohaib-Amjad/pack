export interface DefaultCaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  published_at: string;
  read_time?: string;
  cover_image: string;
  is_published: boolean;
  tags: string[];
  content: string;
}

export const DEFAULT_CASE_STUDIES: Record<string, DefaultCaseStudy> = {
  "luxe-candle-co-rigid-boxes": {
    id: "case-1",
    slug: "luxe-candle-co-rigid-boxes",
    title: "How Luxe Candle Co. Increased Sales 40% With Custom Rigid Boxes",
    category: "Retail & Gift",
    excerpt: "Luxe Candle Co. partnered with HOF Pack to redesign their packaging — resulting in a 40% revenue increase in one quarter.",
    author: "HOF Pack Team",
    published_at: "2026-06-25T00:00:00.000Z",
    read_time: "5 min read",
    cover_image: "/images/case-studies/luxe-candle-co-rigid-boxes.jpg",
    is_published: true,
    tags: ["rigid-boxes", "luxury", "unboxing"],
    content: `<h2>1. Introduction</h2>
<p>When Luxe Candle Co. first approached HOF Pack, they had a problem that many premium brands face: their product was exceptional, but their packaging told a different story.</p>
<p>Their hand-poured soy candles were priced at $45–$65 per unit — a luxury price point. But the plain kraft boxes they shipped in looked like something you'd find at a dollar store. Customers loved the candles but felt let down by the unboxing experience.</p>
<p>In this case study, we'll walk through how we helped Luxe Candle Co. transform their packaging — and what happened to their sales, reviews, and brand perception as a result.</p>
<p><strong>The result? A 40% increase in revenue within 90 days of switching to HOF Pack rigid boxes.</strong></p>

<h2>2. The Challenge</h2>
<p>Luxe Candle Co. was losing customers at the exact moment they should have been winning them over — the unboxing.</p>
<p>Founder Sarah K. noticed a pattern in her customer reviews. Positive reviews almost always described the candle itself: the scent, the burn time, the clean ingredients. But a growing number of 3-star reviews specifically called out the packaging as "cheap" or "disappointing for the price."</p>
<p>The key issues were:</p>
<ul>
  <li>Plain kraft mailer boxes with no branding beyond a sticker label</li>
  <li>No interior protection — candles shifted during shipping and arrived scratched</li>
  <li>No "gift-ready" feel — customers buying as gifts had to rewrap everything themselves</li>
  <li>Zero Instagram-worthy unboxing moments — no UGC, no organic social sharing</li>
</ul>
<p>Sarah came to us with a clear brief: <em>"Make our packaging match the quality of our candles."</em></p>

<h2>3. Our Approach</h2>
<p>Before we designed anything, our team spent time understanding the Luxe Candle Co. brand — their aesthetic, their customer, their price point, and their goals.</p>
<p>We proposed three packaging concepts, each with a different balance of cost vs. premium feel:</p>
<p><strong>Option A: Printed Folding Carton</strong><br>A cost-efficient upgrade with full-color printing and a soft-touch matte finish. Better than kraft, but still a tuck-end box.</p>
<p><strong>Option B: Two-Piece Rigid Box</strong><br>A rigid base and lid set with a custom interior foam insert. Feels premium, protects the candle completely, and creates a true gift experience.</p>
<p><strong>Option C: Magnetic Closure Rigid Box</strong><br>The most premium option — a single rigid box with a magnetic closure, ribbon pull, and foil-stamped logo on the lid.</p>
<p>After reviewing 3D mockups and physical samples, Sarah chose <strong>Option B</strong> — the two-piece rigid box — as the best balance of luxury feel and unit economics at her volume.</p>

<h2>4. The Design &amp; Production Process</h2>
<p>Our design team worked directly with Luxe Candle Co.'s brand guidelines to create a box that felt like a natural extension of the product.</p>
<p>Key design decisions:</p>
<ul>
  <li><strong>Exterior:</strong> Deep forest green with matte lamination — matching the brand's hero color</li>
  <li><strong>Logo:</strong> Gold foil stamp on the lid — adds perceived value without complex printing</li>
  <li><strong>Interior:</strong> Custom die-cut foam insert in the exact dimensions of each candle SKU</li>
  <li><strong>Tissue paper:</strong> Branded tissue with the Luxe Candle Co. monogram printed in gold</li>
  <li><strong>Insert card:</strong> A small "about your candle" card with care instructions and brand story</li>
</ul>
<p>From approved design to first production sample: <strong>8 business days.</strong><br>From sample approval to first full shipment of 2,500 units: <strong>22 business days.</strong></p>

<h2>5. The Results</h2>
<p>Within 90 days of switching to HOF Pack rigid boxes, Luxe Candle Co. saw measurable improvements across every key metric:</p>
<ul>
  <li><strong>+40% revenue increase</strong> — attributed to higher average order value and increased repeat purchases</li>
  <li><strong>3× more Instagram UGC</strong> — customers started sharing unboxing videos without being asked</li>
  <li><strong>Return rate dropped from 8% to 2%</strong> — the foam insert eliminated in-transit damage</li>
  <li><strong>Average order value up $12</strong> — customers started adding more units per order, partly driven by the gift-ready packaging</li>
  <li><strong>Review score improved from 4.1 to 4.7 stars</strong> — packaging was cited positively in 60% of new reviews</li>
</ul>

<blockquote style="border-left:4px solid #e8732a;padding:16px 24px;background:#fdf7f3;margin:28px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0 0 8px;font-style:italic;font-size:16px;">"HOF Pack transformed how our customers perceive us. We went from a generic candle brand to a luxury gift experience literally overnight. The packaging pays for itself."</p>
  <p style="margin:0;font-weight:700;font-size:13px;">— Sarah K., Founder of Luxe Candle Co.</p>
</blockquote>

<h2>6. Key Takeaways for Packaging Buyers</h2>
<p>If you're a product-based brand considering a packaging upgrade, here's what the Luxe Candle Co. experience taught us:</p>
<ul>
  <li><strong>Packaging is a marketing channel.</strong> Every box that ships is an opportunity to create a brand advocate. Treat it like one.</li>
  <li><strong>Premium packaging doesn't have to be expensive.</strong> At 2,500 units, Luxe Candle Co.'s per-unit packaging cost increased by $1.80. Their average order value increased by $12. The math works.</li>
  <li><strong>Interior experience matters as much as exterior.</strong> The foam insert and tissue paper made the candle feel like a gift — and customers shared that feeling online.</li>
  <li><strong>Sample before you commit.</strong> We always produce physical samples before full production. Sarah held the box in her hands before approving a single unit of production.</li>
</ul>
<p>Ready to do the same for your brand? <a href="/contact">Get a free quote from HOF Pack</a> and let's design packaging your customers will talk about.</p>`,
  },
  "freshbrew-coffee-mylar-bags": {
    id: "case-2",
    slug: "freshbrew-coffee-mylar-bags",
    title: "FreshBrew Coffee Bags: Scaling From 500 to 50,000 Units",
    category: "Food & Beverage",
    excerpt: "FreshBrew needed custom mylar pouches as they scaled from a local roaster to a national e-commerce operation.",
    author: "HOF Pack Team",
    published_at: "2026-06-25T00:00:00.000Z",
    read_time: "5 min read",
    cover_image: "/images/case-studies/freshbrew-coffee-mylar-bags.jpg",
    is_published: true,
    tags: ["mylar-bags", "coffee-packaging", "food-grade"],
    content: `<h2>1. Introduction</h2>
<p>Scaling a product-based business is exciting — until you realize your packaging supplier can't keep up.</p>
<p>FreshBrew Coffee started as a small-batch roaster in Austin, Texas, selling 500 bags of specialty coffee per month through their own website. When they landed a partnership with a major meal-kit subscription company, their monthly order volume was set to jump from 500 to 25,000 bags — virtually overnight.</p>
<p>Their existing supplier couldn't handle it. Lead times were 12 weeks. Minimum orders were too low to negotiate. And their current bags didn't even have the features the meal-kit partner required.</p>
<p>This is the story of how HOF Pack helped FreshBrew scale from 500 to 50,000 units per quarter — without compromising their brand or their quality standards.</p>

<h2>2. The Packaging Challenge</h2>
<p>When FreshBrew's founder, Marcus T., contacted us, he had three weeks before he needed to confirm the meal-kit partnership. The partner had specific packaging requirements:</p>
<ul>
  <li>Food-grade mylar stand-up pouches (not paper bags)</li>
  <li>One-way degassing valve for freshness</li>
  <li>Resealable zipper closure</li>
  <li>Full-color custom printing with matte finish</li>
  <li>Available in 250g and 500g sizes</li>
  <li>Minimum first order: 10,000 units per SKU</li>
  <li>Delivery required within 6 weeks</li>
</ul>
<p>Their previous supplier had a 12-week lead time and a maximum capacity of 5,000 units per run. The gap was too large to bridge.</p>
<p>Marcus also had a brand constraint: FreshBrew had built a loyal following around their distinctive packaging — dark olive green bags with a hand-drawn compass rose logo. Any new packaging had to match their existing Pantone colors exactly, or risk confusing their existing customers.</p>

<h2>3. How HOF Pack Solved It</h2>
<p>We assigned a dedicated account manager to FreshBrew within 24 hours of their inquiry. Here's the timeline of what happened next:</p>
<p><strong>Day 1–2: Requirements &amp; specification lock</strong><br>We collected exact Pantone codes, size specifications, and the meal-kit partner's compliance checklist. Our production team confirmed feasibility for 6-week delivery.</p>
<p><strong>Day 3–5: Sample production</strong><br>We fast-tracked physical samples of both the 250g and 500g bags. FreshBrew received samples on Day 7 — including a version with their exact logo and colorway, not just a generic sample.</p>
<p><strong>Day 8: Sample approval</strong><br>Marcus approved both SKUs on Day 8 after confirming the valve function, zipper seal strength, and print color accuracy against his existing bags.</p>
<p><strong>Week 2–6: Full production run</strong><br>We produced 15,000 units of the 250g bag and 10,000 units of the 500g bag — a combined first order of 25,000 units, delivered to FreshBrew's Austin warehouse in 5.5 weeks.</p>

<h2>4. The Technical Specifications</h2>
<p>For packaging buyers and brands with similar requirements, here are the exact specifications we produced for FreshBrew:</p>
<ul>
  <li><strong>Material:</strong> 3-layer foil mylar (PET/AL/PE) — food-grade, oxygen barrier, moisture resistant</li>
  <li><strong>Finish:</strong> Matte lamination exterior, gloss interior</li>
  <li><strong>Printing:</strong> 8-color digital printing — Pantone-matched to FreshBrew's existing colorway</li>
  <li><strong>Valve:</strong> One-way degassing valve (0.8cm diameter, recessed flush with bag surface)</li>
  <li><strong>Closure:</strong> Double-track resealable zipper at top</li>
  <li><strong>Bottom:</strong> K-seal gusset for stand-up stability</li>
  <li><strong>Sizes:</strong> 250g (6" × 3.5" × 10") and 500g (7" × 4" × 11.5")</li>
</ul>

<h2>5. The Results</h2>
<p>The meal-kit partnership launched on schedule. Two years later, FreshBrew is one of HOF Pack's longest-running clients. Here's where things stand today:</p>
<ul>
  <li><strong>Volume growth:</strong> From 500 units/month to 50,000 units/quarter</li>
  <li><strong>Cost reduction:</strong> Per-unit packaging cost dropped 22% vs. their previous supplier</li>
  <li><strong>Lead time:</strong> Standard reorder lead time is now 18 days (vs. 84 days with their old supplier)</li>
  <li><strong>Zero quality complaints</strong> across two years and 8 production runs</li>
  <li><strong>New SKUs added:</strong> FreshBrew now uses HOF Pack for 3 additional bag formats — whole bean, decaf, and a seasonal limited edition</li>
</ul>

<blockquote style="border-left:4px solid #e8732a;padding:16px 24px;background:#fdf7f3;margin:28px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0 0 8px;font-style:italic;font-size:16px;">"HOF Pack didn't just solve our immediate problem. They became a real operational partner. When we need to scale up for the holiday season or launch a new SKU fast, I know they can handle it."</p>
  <p style="margin:0;font-weight:700;font-size:13px;">— Marcus T., Founder &amp; CEO of FreshBrew Coffee</p>
</blockquote>

<h2>6. Key Lessons for Food &amp; Beverage Brands</h2>
<ul>
  <li><strong>Qualify your supplier before you need them at scale.</strong> Ask about their maximum capacity and lead times at 10× your current volume before you have a crisis.</li>
  <li><strong>Sample turnaround time is a real signal.</strong> A supplier who can get you a color-accurate, spec-correct sample in 5 days is a supplier who has the infrastructure to deliver at scale.</li>
  <li><strong>Pantone matching matters.</strong> Brand consistency across every touchpoint — including packaging — is what builds recognition. Don't compromise on color.</li>
  <li><strong>Relationship &gt; transaction.</strong> FreshBrew's growth required fast decisions and flexible production scheduling. That only works with a supplier who knows your business.</li>
</ul>
<p>If you're scaling a food or beverage brand and need a packaging partner who can grow with you, <a href="/contact">contact HOF Pack today</a>.</p>`,
  },
  "glowskin-beauty-kraft-boxes": {
    id: "case-3",
    slug: "glowskin-beauty-kraft-boxes",
    title: "GlowSkin Beauty: Eco-Friendly Kraft Boxes That Customers Love",
    category: "Beauty & Cosmetics",
    excerpt: "GlowSkin Beauty switched to HOF Pack kraft boxes and saw a 28% increase in 5-star reviews mentioning packaging.",
    author: "HOF Pack Team",
    published_at: "2026-06-25T00:00:00.000Z",
    read_time: "5 min read",
    cover_image: "/images/case-studies/glowskin-beauty-kraft-boxes.jpg",
    is_published: true,
    tags: ["kraft-boxes", "eco-packaging", "sustainable"],
    content: `<h2>1. Introduction</h2>
<p>Sustainability in packaging isn't just a trend — for many brands, it's a core part of their identity and their customers' buying decision.</p>
<p>GlowSkin Beauty sells clean, plant-based skincare products direct-to-consumer. Their customers care deeply about what goes into the products — and increasingly, what goes around them. When GlowSkin started receiving customer complaints about their white mailer boxes and plastic inserts, founder Maya T. knew it was time for a change.</p>
<p>This is the story of how HOF Pack helped GlowSkin Beauty transition to 100% eco-friendly packaging — while actually improving their unboxing experience and reducing their per-unit packaging cost by 18%.</p>

<h2>2. The Problem With Their Old Packaging</h2>
<p>GlowSkin's original packaging was functional, but it worked against their brand in several ways:</p>
<ul>
  <li><strong>White corrugated mailer boxes</strong> — generic and unbranded, with nothing to distinguish them from any other DTC shipment</li>
  <li><strong>Plastic bubble wrap inserts</strong> — directly contradicted GlowSkin's "clean beauty" positioning</li>
  <li><strong>No interior branding</strong> — opening the box felt transactional, not experiential</li>
  <li><strong>Customer feedback:</strong> Multiple reviews mentioned feeling "guilty" about the packaging waste</li>
</ul>
<p>Maya set three clear goals for the rebrand:</p>
<ol>
  <li>Switch to 100% recycled and recyclable packaging — zero plastic</li>
  <li>Maintain or improve the unboxing experience despite using "humbler" materials</li>
  <li>Keep the total packaging cost under $1.50 per unit at their current volume of 3,000 orders/month</li>
</ol>

<h2>3. The HOF Pack Solution</h2>
<p>We presented GlowSkin with a fully eco-certified packaging system — every component made from recycled or compostable materials, with no plastic anywhere in the supply chain.</p>
<p><strong>The outer box:</strong> Custom kraft mailer box made from 100% recycled corrugated board. Printed with water-based, soy-ink in GlowSkin's brand colors. Certified by FSC (Forest Stewardship Council).</p>
<p><strong>Interior filler:</strong> Recycled crinkle paper in GlowSkin's brand color (dusty pink) — replacing bubble wrap entirely. Biodegradable, recyclable, and visually beautiful.</p>
<p><strong>Tissue paper:</strong> Recycled tissue in white with a subtle GlowSkin monogram printed in sage green. Adds a layer of reveal that makes the unboxing feel intentional.</p>
<p><strong>Insert card:</strong> A compostable "thank you" card printed on seed paper — customers can plant the card after reading it. Each card grows wildflowers.</p>
<p><strong>QR code:</strong> Printed on the inside of the box lid, linking to GlowSkin's sustainability pledge page — turning the packaging into a brand storytelling moment.</p>

<h2>4. The Design Process</h2>
<p>Maya was initially worried that kraft and recycled materials would look "rough" or "cheap" compared to a smooth white box. Our design team had a different perspective: <em>natural materials, done well, look more premium than plastic-laminated white boxes.</em></p>
<p>We created three design mockups:</p>
<ul>
  <li>Natural kraft with minimal 1-color printing (lowest cost)</li>
  <li>Kraft with 2-color soy-ink printing + foil-free logo treatment</li>
  <li>Kraft with full-color printing + debossed logo on the outer flap</li>
</ul>
<p>Maya chose the second option — the 2-color print — which hit her cost target while looking significantly more elevated than her previous white box.</p>
<p>Production timeline: 14 days from approved design to first shipment of 3,500 units.</p>

<h2>5. The Results</h2>
<p>Six months after launching the new packaging, GlowSkin Beauty's metrics told a clear story:</p>
<ul>
  <li><strong>+28% increase in 5-star reviews</strong> specifically mentioning packaging — customers used words like "thoughtful," "beautiful," and "exactly what I expected from a clean beauty brand"</li>
  <li><strong>Featured in 3 sustainability-focused media outlets</strong> — including a "Best Eco Packaging" roundup that drove over 4,000 new website visitors</li>
  <li><strong>18% reduction in per-unit packaging cost</strong> — kraft material is less expensive than the white corrugated they'd been using, and eliminating bubble wrap saved $0.22 per order</li>
  <li><strong>NPS improved from 61 to 74</strong> — packaging was cited as a contributing factor in post-purchase surveys</li>
  <li><strong>Instagram UGC up 2.4×</strong> — the seed paper card in particular was widely shared online</li>
</ul>

<blockquote style="border-left:4px solid #e8732a;padding:16px 24px;background:#fdf7f3;margin:28px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0 0 8px;font-style:italic;font-size:16px;">"Our customers post about our packaging almost as much as our products now. HOF Pack made sustainability look beautiful. And honestly, it costs us less per box than what we were doing before."</p>
  <p style="margin:0;font-weight:700;font-size:13px;">— Maya T., CMO at GlowSkin Beauty</p>
</blockquote>

<h2>6. How to Make Eco Packaging Work for Your Brand</h2>
<p>GlowSkin's experience holds several lessons for brands considering a sustainability-driven packaging rebrand:</p>
<ul>
  <li><strong>Eco doesn't mean plain.</strong> Kraft, recycled, and compostable materials can look stunning with the right design. The constraint forces creativity.</li>
  <li><strong>Tell the story on the box.</strong> GlowSkin's QR code and seed paper card turned sustainability from a cost into a marketing asset. Customers shared it because it was shareable.</li>
  <li><strong>Certifications matter.</strong> FSC certification and compostability certification give your customers proof, not just promises. HOF Pack sources exclusively from certified suppliers.</li>
  <li><strong>You don't have to sacrifice cost.</strong> Eco materials are not always more expensive — especially when you eliminate plastic components that carry both material and disposal costs.</li>
</ul>
<p>If you want to build packaging that reflects your brand's values — and your customers' values — <a href="/contact">start a conversation with HOF Pack</a>. We'll help you find the right eco solution at the right price.</p>`,
  },
};
