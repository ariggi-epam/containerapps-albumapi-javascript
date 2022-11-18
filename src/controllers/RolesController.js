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
exports.getroles = async function (req, res) {
    console.log("calling get roles\n");


    const accessToken=req.headers['x-ms-auth-token'];
    console.log("access token 2 "+accessToken);
    console.log(context);
    
    const roles = [];
    
    for (const [role, groupId] of Object.entries(roleGroupMappings)) {
        if (await isUserInGroup(groupId, accessToken)) {
            roles.push(role);
        }
    }
    res.json({
        roles
    });
}

async function isUserInGroup(groupId, bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);
    return matchingGroups.length > 0;
}