import { Card, Center, Group, Loader, Table as MTable, ScrollArea, Space, Title } from "@mantine/core";
import { EmptyState } from "../empty-state/empty-state.component";
import { EmojiTags } from "@/shared/utils/emoji";
import { Emoji } from "../emojis/Emoji";
import { ReactElement } from "react";

type RowConfig = {
  header: string;
  render: (record: any) => any;
}

type TableProps = {
  title: string;
  data: any[];
  settings: RowConfig[];
  loading: boolean;
  rightSection?: ReactElement;
}

export function Table({ data = [], settings, loading, title, rightSection }: TableProps) {
  return (
    <Card withBorder padding="lg" radius="sm">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Title order={2} size="xs">{title}</Title>
          {rightSection}
        </Group>
      </Card.Section>
      <Space h={16} />
      <ScrollArea w="100%" type="never">
        <MTable miw={900} highlightOnHover verticalSpacing="sm">
          <MTable.Thead>
            <MTable.Tr>
              {settings.map(({ header }) => <MTable.Th key={header}>{header}</MTable.Th>)}
            </MTable.Tr>
          </MTable.Thead>
          <MTable.Tbody>
            {!loading && Boolean(data.length) && data
              .slice()
              .sort((a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at)))
              .map((row, index) => (
                <MTable.Tr key={index}>
                  {settings.map(({ render }, index) => (
                    <MTable.Td key={index}>{render(row)}</MTable.Td>
                  ))}
                </MTable.Tr>
              ))}
          </MTable.Tbody>
        </MTable>
        {loading || !Boolean(data.length) && (
          <Center h={200}>
            {loading && <Loader />}
            {!loading && !Boolean(data.length) && (
              <EmptyState
                flat
                title="Vacio"
                icon={<Emoji tag={EmojiTags.FACE_WITH_MONOCLE} />} description="Por ahora no hay nada que mostrar."
              />
            )}
          </Center>
        )}
      </ScrollArea>
    </Card>
  )
}