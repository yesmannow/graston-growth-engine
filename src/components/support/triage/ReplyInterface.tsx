import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Send } from 'lucide-react';

interface ReplyInterfaceProps {
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onSendReply: () => void;
  loading: boolean;
}

const ReplyInterface = ({ replyText, onReplyTextChange, onSendReply, loading }: ReplyInterfaceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Reply</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type your reply..."
          value={replyText}
          onChange={(e) => onReplyTextChange(e.target.value)}
          rows={8}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
          <Button onClick={onSendReply} disabled={loading || !replyText.trim()}>
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Sending...' : 'Send Reply'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReplyInterface;