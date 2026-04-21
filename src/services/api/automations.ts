import type { AutomationAction } from '@/types';

// ─── Mock Automation Actions ───────────────────────────────────────────────────

const MOCK_AUTOMATIONS: AutomationAction[] = [
  {
    id: 'send_email',
    name: 'Send Email',
    description: 'Send an automated email notification',
    params: [
      { name: 'to', label: 'Recipient Email', type: 'text', required: true },
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'template', label: 'Template', type: 'select', options: ['onboarding', 'reminder', 'approval_request', 'completion'], required: true },
    ],
  },
  {
    id: 'create_ticket',
    name: 'Create JIRA Ticket',
    description: 'Automatically create a ticket in JIRA',
    params: [
      { name: 'project', label: 'Project Key', type: 'text', required: true },
      { name: 'issueType', label: 'Issue Type', type: 'select', options: ['Task', 'Story', 'Bug', 'Epic'], required: true },
      { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
      { name: 'assignee', label: 'Assignee Username', type: 'text' },
    ],
  },
  {
    id: 'slack_notify',
    name: 'Slack Notification',
    description: 'Post a message to a Slack channel',
    params: [
      { name: 'channel', label: 'Channel', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'text', required: true },
      { name: 'mention_user', label: 'Mention User', type: 'text' },
    ],
  },
  {
    id: 'update_hris',
    name: 'Update HRIS Record',
    description: 'Update employee record in the HR system',
    params: [
      { name: 'field', label: 'Field to Update', type: 'select', options: ['department', 'manager', 'title', 'status'], required: true },
      { name: 'value', label: 'New Value', type: 'text', required: true },
    ],
  },
  {
    id: 'schedule_meeting',
    name: 'Schedule Meeting',
    description: 'Auto-schedule a calendar meeting',
    params: [
      { name: 'title', label: 'Meeting Title', type: 'text', required: true },
      { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
      { name: 'attendees', label: 'Attendees (comma-separated)', type: 'text' },
    ],
  },
  {
    id: 'generate_document',
    name: 'Generate Document',
    description: 'Generate a document from a template',
    params: [
      { name: 'template', label: 'Document Template', type: 'select', options: ['offer_letter', 'nda', 'performance_review', 'termination'], required: true },
      { name: 'output_format', label: 'Output Format', type: 'select', options: ['PDF', 'DOCX'], required: true },
      { name: 'send_to_employee', label: 'Send to Employee', type: 'boolean' },
    ],
  },
];

// ─── Simulated network delay ───────────────────────────────────────────────────

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ─── API Functions ─────────────────────────────────────────────────────────────

export async function getAutomations(): Promise<AutomationAction[]> {
  await delay(300);
  return MOCK_AUTOMATIONS;
}

export async function getAutomationById(id: string): Promise<AutomationAction | undefined> {
  await delay(100);
  return MOCK_AUTOMATIONS.find((a) => a.id === id);
}
