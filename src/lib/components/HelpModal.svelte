<script lang="ts">
    import { Dialog } from 'bits-ui';
    import { CircleHelp, X, ChevronDown, ChevronUp } from '@lucide/svelte';
    import type { HelpContent } from '$lib/config/helpContent';

    interface Props {
        helpContent: HelpContent;
    }

    let { helpContent }: Props = $props();

    let open = $state(false);
    let expandedSections = $state<Set<number>>(new Set([0]));

    function toggleSection(index: number) {
        const next = new Set(expandedSections);
        if (next.has(index)) {
            next.delete(index);
        } else {
            next.add(index);
        }
        expandedSections = next;
    }

    function formatContent(text: string): string {
        // Convert **bold** to <strong> and newlines to <br>
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger
        data-testid="help-modal-trigger"
        class="btn preset-tonal-primary flex items-center gap-2 text-sm"
        type="button"
    >
        <CircleHelp size={16} />
        Need Help?
    </Dialog.Trigger>

    <Dialog.Portal>
        <Dialog.Overlay
            class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
        />

        <Dialog.Content
            data-testid="help-modal-content"
            class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 flex max-h-[90vh] w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border border-surface-300-600 bg-surface-50-900 shadow-xl"
        >
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-surface-300-600 px-6 py-4 flex-shrink-0">
                <div class="flex items-center gap-3">
                    <CircleHelp size={20} class="text-primary-500" />
                    <Dialog.Title class="text-lg font-semibold text-surface-900-50">
                        Help: {helpContent.title}
                    </Dialog.Title>
                </div>
                <Dialog.Close
                    data-testid="help-modal-close"
                    class="rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <X size={18} />
                    <span class="sr-only">Close</span>
                </Dialog.Close>
            </div>

            <!-- Scrollable body -->
            <div class="flex-1 overflow-y-auto min-h-0 p-6 space-y-4">
                <!-- Intro -->
                <p class="text-surface-700-300 text-sm leading-relaxed" data-testid="help-modal-intro">
                    {helpContent.intro}
                </p>

                <!-- Sections as accordion -->
                <div class="space-y-2" data-testid="help-modal-sections">
                    {#each helpContent.sections as section, i}
                        <div
                            class="rounded-lg border border-surface-300-600 overflow-hidden"
                            data-testid="help-section-{i}"
                        >
                            <!-- Section header -->
                            <button
                                type="button"
                                onclick={() => toggleSection(i)}
                                class="w-full flex items-center justify-between px-4 py-3 text-left bg-surface-100-800 hover:bg-surface-200-700 transition-colors"
                                data-testid="help-section-toggle-{i}"
                                aria-expanded={expandedSections.has(i)}
                            >
                                <span class="font-medium text-surface-900-50 text-sm">{section.title}</span>
                                {#if expandedSections.has(i)}
                                    <ChevronUp size={16} class="text-surface-500 flex-shrink-0" />
                                {:else}
                                    <ChevronDown size={16} class="text-surface-500 flex-shrink-0" />
                                {/if}
                            </button>

                            <!-- Section body -->
                            {#if expandedSections.has(i)}
                                <div
                                    class="px-4 py-4 space-y-4 bg-surface-50-900"
                                    data-testid="help-section-body-{i}"
                                >
                                    <p
                                        class="text-surface-700-300 text-sm leading-relaxed"
                                    >
                                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                        {@html formatContent(section.content)}
                                    </p>

                                    {#if section.screenshot}
                                        <div
                                            class="rounded-md overflow-hidden border border-surface-300-600"
                                            data-testid="help-screenshot-{i}"
                                        >
                                            <img
                                                src="/help/screenshots/{section.screenshot}"
                                                alt="Screenshot: {section.title}"
                                                class="w-full h-auto object-contain"
                                                onerror={(e) => {
                                                    const img = e.currentTarget as HTMLImageElement;
                                                    img.style.display = 'none';
                                                    const placeholder = img.nextElementSibling as HTMLElement | null;
                                                    if (placeholder) placeholder.style.display = 'flex';
                                                }}
                                            />
                                            <!-- Shown when image fails to load -->
                                            <div
                                                class="hidden items-center justify-center h-32 bg-surface-100-800 text-surface-500 text-sm"
                                                aria-hidden="true"
                                            >
                                                Screenshot: {section.title}
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end border-t border-surface-300-600 bg-surface-100-800 px-6 py-4 flex-shrink-0">
                <Dialog.Close
                    class="btn preset-filled-primary-500 text-sm"
                    data-testid="help-modal-close-footer"
                >
                    Close
                </Dialog.Close>
            </div>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
