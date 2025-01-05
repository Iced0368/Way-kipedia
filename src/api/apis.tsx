import wiki, { wikiSummary } from "wikipedia";

const getDocData = async (dest: string) => {
    let pageid: number = 0;
    let touched: string = "";
    let title: string = "";
    let description: string = "";
    let imageURL: string | null = "";
    let intro: string = "";
    let links: string[] = [];
    //let related: wikiSummary[] = [];
    let redirect: string = "";

    wiki.setLang('ko');
    const page = await wiki.page(dest);

    pageid = page.pageid;
    touched = page.touched;

    title = page.title; 
    if (page.title !== dest)
        redirect = dest;
    else
        redirect = "";

    const allPromise = Promise.all([
        page.summary()
            .then(summary => {
                description = summary.description || "";
                imageURL = summary.originalimage ? summary.originalimage.source : null;
            }),
        page.intro()
            .then(res => intro = res)
            .catch(error => console.error(error)),

        page.links()
            .then(res => links = res)
            .catch(error => console.error(error)),
        
        /*
        page.related()
            .then(res => related = res.pages)
            .catch(error => console.error(error)),
        */
    ])

    await allPromise;

    console.log(page);

    return {
        pageid: pageid, touched: touched,
        title: title,   description: description,
        intro: intro,   imageURL: imageURL,
        links: links,   redirect: redirect,
        //related: related,
        isLoading: false,
    };
}

export { getDocData };