export interface HelpSection {
    title: string;
    content: string;
    screenshot?: string; // path relative to /help/screenshots/
}

export interface HelpContent {
    title: string;
    intro: string;
    sections: HelpSection[];
}

const helpContent: Record<string, HelpContent> = {
    '/user': {
        title: 'Profile',
        intro: 'The Profile page shows your account details, current session status, and OAuth token health.',
        sections: [
            {
                title: 'User Information',
                content: 'The top section displays your account data returned by the OAuth provider — typically your name, email, and unique user ID. Use the "Copy JSON" button to copy the full user object to the clipboard.',
                screenshot: 'profile-user-info.png',
            },
            {
                title: 'Bank Selector',
                content: 'Use the bank dropdown to switch the active bank context. The selected bank affects what data is shown on other pages such as Consents and Entitlements.',
                screenshot: 'profile-bank-selector.png',
            },
            {
                title: 'Session & Token Status',
                content: 'This section shows your current OAuth session health.\n\n- **Green** — token is valid with plenty of time remaining.\n- **Yellow** — token expires in less than 5 minutes.\n- **Red** — token has expired; you may need to log out and back in.\n\nThe access token preview is masked for security. Use the copy button if you need the full value.',
                screenshot: 'profile-token-status.png',
            },
            {
                title: 'Opey Consent',
                content: 'If Opey (the AI assistant) is enabled, this section shows whether an active consent exists. A consent is created automatically the first time you use the chat. You can manage or revoke it from the Consents page.',
                screenshot: 'profile-opey-consent.png',
            },
        ],
    },

    '/user/consents': {
        title: 'Consents',
        intro: 'The Consents page lists all OBP data-access consents associated with your account. Consents grant third-party applications or services permission to access your banking data.',
        sections: [
            {
                title: 'Opey Consents',
                content: 'Consents created specifically for the Opey AI assistant appear in the "Consents for Opey" section. These allow Opey to query the OBP API on your behalf during chat sessions.',
                screenshot: 'consents-opey.png',
            },
            {
                title: 'Other Consents',
                content: 'All other consents (e.g. consents created by third-party apps or manual OBP flows) are listed here. Each card shows the consent status, creation date, and scope.',
                screenshot: 'consents-other.png',
            },
            {
                title: 'Deleting a Consent',
                content: 'Click the "Delete" button on any consent card to revoke it. Revoked consents older than 24 hours are automatically hidden from this list.',
                screenshot: 'consents-delete.png',
            },
        ],
    },

    '/user/consumers': {
        title: 'Consumers',
        intro: 'The Consumers page lists your registered OAuth API consumer applications — these are the credentials used to make calls to the OBP API.',
        sections: [
            {
                title: 'Consumer List',
                content: 'Each consumer card shows the application name, consumer key, status (Enabled/Disabled), and the application type. Credentials such as the consumer secret are only displayed once at registration time.',
                screenshot: 'consumers-list.png',
            },
            {
                title: 'Registering a New Consumer',
                content: 'To register a new API consumer, use the link at the top of the page to go to the consumer registration form. You will need to provide an application name, description, and a redirect URL.',
                screenshot: 'consumers-register-link.png',
            },
            {
                title: 'Consumer Credentials',
                content: 'Keep your consumer key and secret secure. The secret is shown only once during registration. If you lose it, you must create a new consumer.',
            },
        ],
    },

    '/user/entitlements': {
        title: 'Entitlements',
        intro: 'Entitlements are roles that grant your account permission to perform specific actions in the OBP API. This page shows your current entitlements and, if you have the necessary permissions, allows you to add new ones.',
        sections: [
            {
                title: 'Current Entitlements',
                content: 'The table lists every role currently assigned to your account, including the role name, its internal ID, and the bank it applies to (if bank-specific). Roles with an empty bank ID apply system-wide.',
                screenshot: 'entitlements-table.png',
            },
            {
                title: 'Adding an Entitlement',
                content: 'If you hold the "CanCreateEntitlement" permission, an "Add Entitlement" form will appear below the table. Select a role from the dropdown. If the role requires a bank, a bank selector will appear. Click "Add" to submit.',
                screenshot: 'entitlements-add-form.png',
            },
        ],
    },

    '/user/my-data': {
        title: 'My Data',
        intro: 'The My Data page displays records from Personal Dynamic Entities — custom data objects that your bank has defined and that are associated with your account.',
        sections: [
            {
                title: 'Entity Cards',
                content: 'Each card represents a type of personal dynamic entity. The card title is the entity type name. Inside, each record is shown as a set of key-value pairs.',
                screenshot: 'my-data-cards.png',
            },
            {
                title: 'Empty or Error States',
                content: 'If no personal entity types exist at your bank, the page will show an empty state message. Individual entity cards may show an error if the API call for that entity type failed.',
            },
        ],
    },

    '/user/personal-data-fields': {
        title: 'Personal Data Fields',
        intro: 'Personal Data Fields let you store custom attributes on your account — for example, a customer number, date of birth, or any other key-value pair supported by the OBP API.',
        sections: [
            {
                title: 'Existing Fields',
                content: 'The table shows all custom fields currently saved on your account: the field name, its data type, current value, and the date it was added.',
                screenshot: 'personal-data-fields-table.png',
            },
            {
                title: 'Editing a Field',
                content: 'Click the "Edit" button on a row to enter inline edit mode. Change the value (and optionally the type), then click "Save". Click "Cancel" to discard changes.',
                screenshot: 'personal-data-fields-edit.png',
            },
            {
                title: 'Adding a New Field',
                content: 'Use the "Add Field" form at the bottom of the page. Enter a name, choose a type (STRING, INTEGER, DOUBLE, or DATE_WITH_DAY), and provide a value. Click "Add" to save.',
                screenshot: 'personal-data-fields-add.png',
            },
            {
                title: 'Deleting a Field',
                content: 'Click the "Delete" button on any row to permanently remove that field from your account.',
            },
        ],
    },

    '/user/api-collections': {
        title: 'My API Collections',
        intro: 'API Collections let you group OBP API endpoints together for easy reference and sharing. You can use them in the API Explorer or share them with other users.',
        sections: [
            {
                title: 'Collection List',
                content: 'Each card shows a collection name, description, and whether it is shareable (visible to others) or private. Links are provided to view the collection in the Portal or API Explorer.',
                screenshot: 'api-collections-list.png',
            },
            {
                title: 'Creating a Collection',
                content: 'Click "Create New Collection". Enter a name, an optional description, and choose whether the collection is shareable. Click "Create" to save.',
                screenshot: 'api-collections-create.png',
            },
            {
                title: 'Deleting a Collection',
                content: 'Click the "Delete" button on a collection card to remove it. This does not affect the underlying API endpoints.',
            },
        ],
    },

    '/user/api-collections/detail': {
        title: 'API Collection Detail',
        intro: 'This page manages the endpoints within a single API Collection. You can add and remove endpoints, edit the collection settings, or copy endpoints from another collection.',
        sections: [
            {
                title: 'Editing Collection Details',
                content: 'Click "Edit Collection" to modify the name, description, or shareability setting. Click "Save" to apply changes.',
                screenshot: 'api-collection-detail-edit.png',
            },
            {
                title: 'Adding Endpoints',
                content: 'Use the "Add Endpoint" form and start typing an operation ID in the search box. A dropdown will show matching endpoints (up to 20 results). Use the arrow keys to navigate and Enter to select. Click "Add" to save.',
                screenshot: 'api-collection-detail-add-endpoint.png',
            },
            {
                title: 'Copying from Another Collection',
                content: 'Use the "Copy From" dropdown to import all endpoints from one of your other collections into this one.',
                screenshot: 'api-collection-detail-copy.png',
            },
            {
                title: 'Removing Endpoints',
                content: 'Click the "Remove" button next to any endpoint in the list to remove it from this collection.',
            },
        ],
    },
};

/**
 * Returns help content for the given pathname.
 * Falls back to a generic help entry if no exact match is found.
 */
export function getHelpContent(pathname: string): HelpContent | null {
    // Exact match first
    if (helpContent[pathname]) return helpContent[pathname];

    // Match /user/api-collections/[id] to the detail entry
    if (pathname.startsWith('/user/api-collections/')) {
        return helpContent['/user/api-collections/detail'];
    }

    return null;
}
