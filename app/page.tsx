import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen max-w-7xl mx-auto p-4 mt-20">
      <div className="grid grid-cols-4 gap-8">
        {/* Left column */}
        <div className="col-span-1 bg-lime-100 p-4 rounded border border-lime-500">
          <h1 className="text-3xl font-bold">WordPlay</h1>
          <p className="text-gray-600 mt-4">
            Create beautiful documents for free using our templates. Click on a
            template to get started.
          </p>
        </div>

        {/* Templates grid */}
        <div className="col-span-3 grid grid-cols-4 gap-8">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={{
                pathname: `/documents/${template.id}`,
                query: { html: template.html },
              }}
            >
              <div
                className="bg-gray-100 rounded p-4 h-64 border overflow-hidden"
                dangerouslySetInnerHTML={{ __html: template.html }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const templates = [
  {
    id: 1,
    html: `
      <div>
        <h1><b>Document 1</b></h1>
        <p>This is a <strong>basic template</strong> using simple HTML tags.</p>
        <p><i>Italicized text</i> can also be included here.</p>
      </div>
    `,
  },
  {
    id: 2,
    html: `
      <div>
        <h2>Document 2</h2>
        <p>Here is a <b>bold statement</b>, and here is a <u>underlined text</u>.</p>
        <p>We can also use <mark>highlighted text</mark> for emphasis.</p>
      </div>
    `,
  },
  {
    id: 3,
    html: `
      <div>
        <h3><strong>Document 3</strong></h3>
        <p>This template contains a <i>simple list:</i></p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    `,
  },
  {
    id: 4,
    html: `
      <div>
        <h4>Document 4</h4>
        <p>Combining <b>bold</b>, <i>italic</i>, and <u>underline</u> for styling.</p>
        <blockquote>A quote can be included using the <b>blockquote</b> tag.</blockquote>
      </div>
    `,
  },
];
