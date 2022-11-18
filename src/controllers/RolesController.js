const fetch = require('node-fetch').default;

// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
    //EPAM Mesón SBS
    'admin': 'bf4e2697-e9b0-46be-8204-53cb898e4137',
    //EPAM CSR - Meson SBS
    'reader': 'cf83f1bd-a85c-4f7b-8574-7e09a79a084d',
    //fake group
    'editor': 'aaaaaaaa-a85c-4f7b-8574-7e09a79a084d'
};
exports.getroles = async function (context, req) {
    console.log("calling get roles");

    console.log("logging req");
    console.log(req);

    console.log("logging context");
    console.log(context);
    
    const user = req.body || {};
    const roles = [];
    
    for (const [role, groupId] of Object.entries(roleGroupMappings)) {
        if (await isUserInGroup(groupId, user.accessToken)) {
            roles.push(role);
        }
    }
    context.res.json({
        roles
    });
}

async function isUserInGroup(groupId, bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);
    return matchingGroups.length > 0;
}