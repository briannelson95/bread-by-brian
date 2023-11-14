import { supabase } from "@/supabase/lib/supabaseClient";

export function CustomPublish(originalPublishAction: any) {
    const BetterAction = (props: any) => {
        const originalResult = originalPublishAction(props);

        if (props.type == "products") {
            return {
                ...originalResult,
                onHandle: () => {
                    // custom function for supabase will go here
                    console.log(props.draft.price)
                    supabase.from('products')
                      .upsert({ sanity_id: props.id, title: props.draft.title, price: props.draft.price, }, { onConflict: 'sanity_id' })
                      .then(response =>  {
                          console.log(response)

                          if (!response.error) {
                              return
                          }
                      })
    
                    originalResult.onHandle();
                }
            }
        } else {
            // returns original function if type != restaurants
            return {
                ...originalResult,
                onHandle: () => {
                    originalResult.onHandle()
                }
            }
        }
    }

    return BetterAction;
}