import {useLoaderData} from 'react-router';
import {redirect} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const storefront = context.storefront || context.get?.(context.storefront);

  if (!storefront) {
    throw new Response('No storefront context', {status: 500});
  }

  const data = await storefront.query(PAGE_QUERY, {
    variables: {handle},
  });

  if (!data?.page) {
    throw redirect('/');
  }

  return {page: data.page};
}

export default function Page() {
  const {page} = useLoaderData();

  return (
    <div
      dangerouslySetInnerHTML={{__html: page.body}}
    />
  );
}

const PAGE_QUERY = `#graphql
  query Page($handle: String!) {
    page(handle: $handle) {
      title
      handle
      body
    }
  }
`;
