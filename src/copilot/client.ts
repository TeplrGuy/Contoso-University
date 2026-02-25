import { campusTools, invokeTool } from './tools';
import type { ToolResult } from './tools';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  toolCall?: { name: string; params: Record<string, string>; result?: ToolResult };
  timestamp: Date;
}

/**
 * Simulated Copilot SDK client for demo purposes.
 *
 * In production, this would use:
 *   import { CopilotClient } from '@github/copilot-sdk';
 *
 * This demo client processes user prompts locally, detects when tools should
 * be invoked, and returns formatted responses — showcasing the patterns you'd
 * use with the real SDK.
 */
export class CampusAssistantClient {
  private history: ChatMessage[] = [];

  getTools() {
    return campusTools.map(t => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    }));
  }

  async sendMessage(userMessage: string): Promise<ChatMessage[]> {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    this.history.push(userMsg);

    const responses: ChatMessage[] = [];
    const lower = userMessage.toLowerCase();

    // Detect tool invocations from natural language
    if (lower.includes('student') && (lower.includes('search') || lower.includes('find') || lower.includes('who'))) {
      const query = this.extractQuery(userMessage, ['student', 'search', 'find', 'who', 'named', 'called', 'in', 'major']);
      const result = invokeTool('searchStudents', { query });
      responses.push(this.createToolMessage('searchStudents', { query }, result));
      responses.push(this.createAssistantMessage(this.formatToolResponse('searchStudents', result)));
    } else if (lower.includes('course') && (lower.includes('list') || lower.includes('show') || lower.includes('what'))) {
      const dept = this.extractDepartment(userMessage);
      const result = invokeTool('listCourses', { department: dept });
      responses.push(this.createToolMessage('listCourses', { department: dept }, result));
      responses.push(this.createAssistantMessage(this.formatToolResponse('listCourses', result)));
    } else if (lower.includes('teacher') || lower.includes('faculty') || lower.includes('professor')) {
      const query = this.extractQuery(userMessage, ['teacher', 'faculty', 'professor', 'find', 'who', 'about', 'info']);
      const result = invokeTool('getTeacherInfo', { query });
      responses.push(this.createToolMessage('getTeacherInfo', { query }, result));
      responses.push(this.createAssistantMessage(this.formatToolResponse('getTeacherInfo', result)));
    } else if (lower.includes('stat') || lower.includes('overview') || lower.includes('how many') || lower.includes('total')) {
      const result = invokeTool('getUniversityStats', {});
      responses.push(this.createToolMessage('getUniversityStats', {}, result));
      responses.push(this.createAssistantMessage(this.formatToolResponse('getUniversityStats', result)));
    } else if (lower.includes('help') || lower.includes('what can you')) {
      responses.push(this.createAssistantMessage(this.getHelpMessage()));
    } else {
      responses.push(this.createAssistantMessage(
        "I'm the Contoso University AI Campus Assistant, powered by the GitHub Copilot SDK. " +
        "I can help you find students, browse courses, look up faculty, and get university statistics. " +
        "Try asking me something like:\n\n" +
        "• \"Find students in Computer Science\"\n" +
        "• \"List all courses\"\n" +
        "• \"Who teaches in Mathematics?\"\n" +
        "• \"Show university statistics\""
      ));
    }

    this.history.push(...responses);
    return responses;
  }

  private extractQuery(message: string, stopWords: string[]): string {
    const words = message.split(/\s+/).filter(w => !stopWords.includes(w.toLowerCase().replace(/[?.,!]/g, '')));
    return words.slice(-3).join(' ').replace(/[?.,!]/g, '').trim() || message;
  }

  private extractDepartment(message: string): string {
    const depts = ['Computer Science', 'Mathematics', 'Business', 'Engineering', 'Physics', 'English', 'History'];
    for (const dept of depts) {
      if (message.toLowerCase().includes(dept.toLowerCase())) return dept;
    }
    return '';
  }

  private createToolMessage(name: string, params: Record<string, string>, result: ToolResult): ChatMessage {
    return {
      id: crypto.randomUUID(),
      role: 'tool',
      content: result.summary,
      toolCall: { name, params, result },
      timestamp: new Date(),
    };
  }

  private createAssistantMessage(content: string): ChatMessage {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date(),
    };
  }

  private formatToolResponse(toolName: string, result: ToolResult): string {
    if (!result.success) return `Sorry, I encountered an error: ${result.summary}`;

    const data = result.data;
    if (toolName === 'getUniversityStats' && typeof data === 'object' && data !== null) {
      const stats = data as { totalStudents: number; totalCourses: number; totalFaculty: number; totalEnrollments: number; departments: string[] };
      return `📊 **University Overview**\n\n` +
        `• **Students**: ${stats.totalStudents}\n` +
        `• **Courses**: ${stats.totalCourses}\n` +
        `• **Faculty**: ${stats.totalFaculty}\n` +
        `• **Total Enrollments**: ${stats.totalEnrollments}\n` +
        `• **Departments**: ${stats.departments.join(', ')}`;
    }

    if (Array.isArray(data) && data.length === 0) {
      return `No results found. ${result.summary}`;
    }

    if (Array.isArray(data)) {
      const items = data.slice(0, 10);
      if (toolName === 'searchStudents') {
        return `🎓 ${result.summary}\n\n` +
          items.map((s: Record<string, unknown>) => `• **${s.name}** — ${s.major} (${s.email}), ${s.courses} courses`).join('\n');
      }
      if (toolName === 'listCourses') {
        return `📚 ${result.summary}\n\n` +
          items.map((c: Record<string, unknown>) => `• **${c.code}** ${c.title} — ${c.department} (${c.credits} credits, ${c.students} students)`).join('\n');
      }
      if (toolName === 'getTeacherInfo') {
        return `👨‍🏫 ${result.summary}\n\n` +
          items.map((t: Record<string, unknown>) => `• **${t.name}** — ${t.department}, ${t.role} (${t.office})`).join('\n');
      }
    }

    return result.summary;
  }

  private getHelpMessage(): string {
    return "🤖 **Contoso University AI Campus Assistant**\n\n" +
      "I'm powered by the GitHub Copilot SDK with custom tools registered for this university. " +
      "Here's what I can do:\n\n" +
      "| Tool | Description |\n" +
      "|------|-------------|\n" +
      this.getTools().map(t => `| \`${t.name}\` | ${t.description} |`).join('\n') +
      "\n\n**Try these prompts:**\n" +
      "• \"Find students majoring in Computer Science\"\n" +
      "• \"Show me all courses in the Mathematics department\"\n" +
      "• \"Who are the faculty members?\"\n" +
      "• \"Give me university statistics\"";
  }

  clearHistory() {
    this.history = [];
  }
}
