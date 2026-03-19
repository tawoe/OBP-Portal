<script lang="ts">
    import { page } from '$app/state';
    import { getActiveMenuItem } from '$lib/config/navigation';
    import { getHelpContent } from '$lib/config/helpContent';
    import HelpModal from '$lib/components/HelpModal.svelte';

    let { children } = $props();

    let activeMenuItem = $derived(getActiveMenuItem(page.url.pathname));
    let helpContent = $derived(getHelpContent(page.url.pathname));
</script>

<div class="flex flex-col flex-1 min-h-0">
    <!-- Title Bar -->
    <header class="border-b border-surface-300-600 bg-surface-50-900 px-6 py-4 flex-shrink-0">
        <div class="flex items-start justify-between gap-4">
            <div>
                <h1 class="text-2xl font-semibold text-surface-900-50">
                    {activeMenuItem.label}
                </h1>
                <p class="text-surface-600-400 text-sm mt-1">
                    {activeMenuItem.description || `Manage your ${activeMenuItem.label.toLowerCase()} settings`}
                </p>
            </div>
            {#if helpContent}
                <div class="flex-shrink-0 mt-1">
                    <HelpModal {helpContent} />
                </div>
            {/if}
        </div>
    </header>

    <!-- Page Content -->
    <div class="flex-1 overflow-y-auto min-h-0">
        <div class="p-6">
            {@render children()}
        </div>
    </div>
</div>