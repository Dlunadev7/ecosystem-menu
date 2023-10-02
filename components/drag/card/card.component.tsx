import React from 'react';
import { Card, Flex, Menu, Text } from '@mantine/core';
import { SortableElement } from 'react-sortable-hoc';
import { IconDots, IconPower, IconSettings, IconTrash } from '@tabler/icons-react';
import { DragHandle } from '@/assets/svg/DragHandle';
import { SortableCategoryProps } from '../categories.interface';

export function SortableCategoryCard({index, category, editDisable, setUpdateCategory, setCategory }: SortableCategoryProps) {
  const SortableCard = SortableElement(() => {
      return (
        <>
          <Card
            key={category.id}
            withBorder
            style={{ overflow: "unset" }}
            h={96.15}
          >
            <Flex gap={16} h="100%" align="center">
              {
                !editDisable && <DragHandle />
              }
           
              <div style={{ width: "100%", height: "100%" }}>
                <Flex justify="space-between" align="center">
                  <Text tt="uppercase" fz="sm" fw="bold">
                    {category.name}
                  </Text>
                  <Menu shadow="sm" position="bottom-end">
                    <Menu.Target>
                      <IconDots size={24} style={{ minWidth: 24 }} />
                    </Menu.Target>
  
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() =>
                          setUpdateCategory({
                            id: category.id,
                            name: category.name,
                            description: category.description,
                          })
                        }
                        leftSection={<IconSettings size={14} />}
                      >
                        Editar
                      </Menu.Item>
                      <Menu.Item disabled leftSection={<IconPower size={14} />}>
                        Desactivar
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={14} />}
                        onClick={() => setCategory(category)}
                      >
                        Eliminar
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
                {Boolean(category.description?.length) && (
                  <Text fz="xs" c="dimmed">
                    {Number(category.description?.length) > 50
                      ? `${category.description?.slice(0, 80)}...`
                      : category.description}
                  </Text>
                )}
              </div>
            </Flex>
          </Card>
        </>
      );
    });
  
    return <SortableCard index={index} />;
}
